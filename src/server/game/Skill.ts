import { Config, JACKPOT_FACTOR, JACKPOT_POWER, JACKPOT_THRESHOLD } from "../config";
import { SkillArray } from "../definitions/types";

enum skcnv {
	rld = 0,
	pen = 1,
	str = 2,
	dam = 3,
	spd = 4,
	shi = 5,
	atk = 6,
	hlt = 7,
	rgn = 8,
	mob = 9
}

export type SkillKey = keyof typeof skcnv;

const levelers: number[] = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
	11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
	21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
	31, 32, 33, 34, 35, 36, 38, 40, 42, 44
];

const LEVEL_POINTS_LUT = new Uint8Array(100);
for (let i: number = 0; i < levelers.length; i++) {
	LEVEL_POINTS_LUT[levelers[i]] = 1;
}

function levelScoreCalc(level: number): number {
	return Math.ceil(1.8 * Math.pow(level + 1, 1.8) - 2 * level + 1);
}

const LEVEL_SCORE_LUT: number[] = [];
for (let i: number = 0; i < 100; i++) {
	LEVEL_SCORE_LUT[i] = levelScoreCalc(i + 1);
}

const CURVE_TABLE: Float32Array = new Float32Array(Config.MAX_SKILL);
for (let i: number = 0; i < CURVE_TABLE.length; i++) {
	CURVE_TABLE[i] = Math.log(4 * (i * (1 / Config.MAX_SKILL)) + 1) / Math.log(5);
}

const BLEED_NEIGHBORS: Int32Array = new Int32Array(20);
for (let i: number = 0; i < 2; i++) {
	for (let j: number = 0; j < 5; j++) {
		const idx: number = j + 5 * i;
		const a: number = ((j + 2) % 5) + 5 * i;
		const b: number = ((j + ((i === 1) ? 1 : 4)) % 5) + 5 * i;
		BLEED_NEIGHBORS[idx * 2] = a;
		BLEED_NEIGHBORS[idx * 2 + 1] = b;
	}
}

export class Skill {
	public raw: SkillArray;
	public caps: SkillArray;
	public name: string[] = [
		"Reload", "Bullet Penetration", "Bullet Health", "Bullet Damage", "Bullet Speed",
		"Shield Capacity", "Body Damage", "Max Health", "Shield Regeneration", "Movement Speed",
	];
	public points: number = 0;
	public score: number = 0;
	public deduction: number = 0;
	public level: number = 0;
	public canUpgrade: boolean = false;
	public rld: number = 0;
	public pen: number = 0;
	public str: number = 0;
	public dam: number = 0;
	public spd: number = 0;
	public shi: number = 0;
	public atk: number = 0;
	public hlt: number = 0;
	public rgn: number = 0;
	public mob: number = 0;
	public rst: number = 0;
	public brst: number = 0;
	public ghost: number = 0;
	public acl: number = 0;
	private attributes: Float32Array = new Float32Array(10);
	constructor(initial: SkillArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) {
		this.raw = initial;
		this.caps = [
			Config.MAX_SKILL, Config.MAX_SKILL, Config.MAX_SKILL, Config.MAX_SKILL, Config.MAX_SKILL,
			Config.MAX_SKILL, Config.MAX_SKILL, Config.MAX_SKILL, Config.MAX_SKILL, Config.MAX_SKILL
		];
		this.reset();
	}

	public get levelScore(): number {
		return this.level < LEVEL_SCORE_LUT.length ? LEVEL_SCORE_LUT[this.level] : levelScoreCalc(this.level);
	}

	public get progress(): number {
		const ls = this.levelScore;
		return (ls) ? (this.score - this.deduction) / ls : 0;
	}

	public cap(skill: SkillKey, real: boolean = false): number {
		if (!real && this.level < Config.SKILL_SOFT_CAP) {
			return Math.round(this.caps[skcnv[skill]] * Config.SOFT_MAX_SKILL);
		}
		return this.caps[skcnv[skill]];
	}

	public upgrade(stat: SkillKey): boolean {
		if (this.points && this.amount(stat) < this.cap(stat)) {
			this.change(stat, 1);
			this.points -= 1;
			return true;
		}
		return false;
	}

	public title(stat: SkillKey): string {
		return this.name[skcnv[stat]];
	}

	public amount(skill: SkillKey): number {
		return this.raw[skcnv[skill]];
	}

	public change(skill: SkillKey, levels: number): void {
		this.raw[skcnv[skill]] += levels;
		this.update();
	}

	public reset(): void {
		this.points = 0;
		this.score = 0;
		this.deduction = 0;
		this.level = 0;
		this.canUpgrade = false;
		this.update();
		this.maintain();
	}

	public update(): void {
		for (let i: number = 0; i < 10; i++) {
			if (this.raw[i] > this.caps[i]) {
				this.points += this.raw[i] - this.caps[i];
				this.raw[i] = this.caps[i];
			}
		}
		for (let i: number = 0; i < 10; i++) {
			const nIdx: number = i * 2;
			const a: number = BLEED_NEIGHBORS[nIdx];
			const b: number = BLEED_NEIGHBORS[nIdx + 1];
			const capV: number = this.caps[i];
			const denominator: number = capV > Config.MAX_SKILL ? capV : Config.MAX_SKILL;
			const rawA: number = this.raw[a];
			const ratioA: number = (rawA / denominator) - 1;
			let value: number = (1 - ratioA * ratioA) * rawA * Config.SKILL_LEAK;
			const rB: number = this.raw[b];
			const ratioB: number = rB / denominator;
			value -= (ratioB * ratioB) * rB * Config.SKILL_LEAK;
			const input: number = this.raw[i] + value;
			let cIdx: number = Math.floor(input);
			if (cIdx < 0) {
				cIdx = 0;
			}
			if (cIdx >= CURVE_TABLE.length) {
				cIdx = CURVE_TABLE.length - 1;
			}

			this.attributes[i] = CURVE_TABLE[cIdx];
		}
		const a_rld: number = this.attributes[0];
		const a_pen: number = this.attributes[1];
		const a_str: number = this.attributes[2];
		const a_dam: number = this.attributes[3];
		const a_spd: number = this.attributes[4];
		const a_shi: number = this.attributes[5];
		const a_atk: number = this.attributes[6];
		const a_hlt: number = this.attributes[7];
		const a_rgn: number = this.attributes[8];
		const a_mob: number = this.attributes[9];
		this.rld = 0.5 ** a_rld;
		this.pen = (a_pen < 0) ? 1 / (1 - a_pen * 2.5) : 2.5 * a_pen + 1;
		this.str = (a_str < 0) ? 1 / (1 - a_str * 2) : 2 * a_str + 1;
		this.dam = (a_dam < 0) ? 1 / (1 - a_dam * 3) : 3 * a_dam + 1;
		this.spd = 0.5 + ((a_spd < 0) ? 1 / (1 - a_spd * 1.5) : 1.5 * a_spd + 1);
		this.acl = (a_rld < 0) ? 1 / (1 - a_rld * 0.5) : 0.5 * a_rld + 1;
		this.rst = 0.5 * a_str + 2.5 * a_pen;
		this.ghost = a_pen;
		const gf: number = Config.GLASS_HEALTH_FACTOR;
		const gfMod: number = 3 / gf - 1;
		this.shi = gf * ((a_shi < 0) ? 1 / (1 - a_shi * gfMod) : gfMod * a_shi + 1);
		this.atk = (a_atk < 0) ? 1 / (1 - a_atk) : a_atk + 1;
		const hltMod: number = 2 / gf - 1;
		this.hlt = gf * ((a_hlt < 0) ? 1 / (1 - a_hlt * hltMod) : hltMod * a_hlt + 1);
		this.mob = (a_mob < 0) ? 1 / (1 - a_mob * 0.8) : 0.8 * a_mob + 1;
		this.rgn = (a_rgn < 0) ? 1 / (1 - a_rgn * 25) : 25 * a_rgn + 1;
		this.brst = 0.15 * a_atk + 0.15 * a_hlt + 0.3 * a_rgn;
	}

	public maintain(): boolean {
		if (this.level < Config.SKILL_CAP) {
			const levelScore: number = this.levelScore
			if (this.score - this.deduction >= levelScore) {
				this.deduction += levelScore;
				this.level += 1;
				if (this.level < LEVEL_POINTS_LUT.length) {
					this.points += LEVEL_POINTS_LUT[this.level];
				}
				if (this.level === Config.TIER_1 || this.level === Config.TIER_2 || this.level === Config.TIER_3) {
					this.canUpgrade = true;
				}
				this.update();
				return true;
			}
		}
		return false;
	}

	public set(values: SkillArray): void {
		this.raw[0] = values[0];
		this.raw[1] = values[1];
		this.raw[2] = values[2];
		this.raw[3] = values[3];
		this.raw[4] = values[4];
		this.raw[5] = values[5];
		this.raw[6] = values[6];
		this.raw[7] = values[7];
		this.raw[8] = values[8];
		this.raw[9] = values[9];
		this.update();
	}

	public setCaps(values: SkillArray): void {
		this.caps[0] = values[0];
		this.caps[1] = values[1];
		this.caps[2] = values[2];
		this.caps[3] = values[3];
		this.caps[4] = values[4];
		this.caps[5] = values[5];
		this.caps[6] = values[6];
		this.caps[7] = values[7];
		this.caps[8] = values[8];
		this.caps[9] = values[9];
		this.update();
	}

	public calculateJackpot() {
		if (this.score > JACKPOT_THRESHOLD * JACKPOT_FACTOR) {
			return Math.pow(this.score - JACKPOT_THRESHOLD, JACKPOT_POWER) + JACKPOT_THRESHOLD;
		}
		return this.score / JACKPOT_FACTOR;
	}
}
