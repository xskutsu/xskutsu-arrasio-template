import { Config } from "../config";
import { Vector2 } from "../types/Vector2";
import * as Random from "../utils/random";

export interface RoomScale {
	square: number;
	linear: number;
}

export class Room {
	public static width: number = Config.WIDTH;
	public static height: number = Config.HEIGHT;
	public static setup: string[][] = Config.ROOM_SETUP;
	public static xgrid: number = Config.X_GRID;
	public static ygrid: number = Config.Y_GRID;
	public static gameMode: string = Config.MODE;
	public static skillBost: number = Config.SKILL_BOOST
	public static maxFood: number = this.width * this.height / 100000 * Config.FOOD_AMOUNT;
	public static nestFoodAmount: number = 0;
	public static spawnPoints: Map<string, Vector2[]> = new Map<string, Vector2[]>();
	public static lastCycle: number = 0;
	public static cycleSpeed: number = 1000 / Config.gameSpeed / 30;
	public static scale: RoomScale = {
		square: this.width * this.height / 1e8,
		linear: Math.sqrt(this.width * this.height / 1e8)
	}

	public static init(): void {
		this.findType("nest");
		this.findType("norm");
		this.findType("bas1");
		this.findType("bas2");
		this.findType("bas3");
		this.findType("bas4");
		this.findType("roid");
		this.findType("rock");
		this.nestFoodAmount = 1.5 * Math.sqrt(this.spawnPoints.get("nest")?.length ?? 0) / this.xgrid / this.ygrid;
	}

	public static isInRoom(location: Vector2): boolean {
		return location.x >= 0 && location.x <= this.width && location.y >= 0 && location.y <= this.height;
	}

	public static random(): Vector2 {
		return {
			x: Random.random(this.width),
			y: Random.random(this.height)
		};
	}

	public static randomType(type: string): Vector2 {
		const points: Vector2[] | undefined = this.spawnPoints.get(type);
		if (points === undefined || points.length === 0) {
			return this.random();
		}
		const selection: Vector2 = Random.choose(points);
		const rangeX: number = this.width / (2 * this.xgrid);
		const rangeY: number = this.height / (2 * this.ygrid);
		return {
			x: (Random.random(rangeX) * Random.choose([-1, 1])) + selection.x,
			y: (Random.random(rangeY) * Random.choose([-1, 1])) + selection.y
		};
	}

	public static gauss(clustering: number): Vector2 {
		const centerX: number = this.width / 2;
		const centerY: number = this.height / 2;
		const deviation = Math.max(this.width, this.height) / clustering;
		let checkVector: Vector2 = {
			x: 0,
			y: 0
		};
		do {
			checkVector.x = Random.gauss(centerX, deviation);
			checkVector.y = Random.gauss(centerY, deviation);
		} while (!this.isInRoom(checkVector));
		return checkVector;
	}

	public static gaussInverse(clustering: number): Vector2 {
		let checkVector: Vector2 = {
			x: 0,
			y: 0
		};
		do {
			checkVector.x = Random.gaussInverse(0, this.width, clustering);
			checkVector.y = Random.gaussInverse(0, this.height, clustering);
		} while (!this.isInRoom(checkVector));
		return checkVector;
	}

	public static gaussRing(radius: number, clustering: number): Vector2 {
		const centerX: number = this.width / 2;
		const centerY: number = this.height / 2;
		const ringRadius: number = Math.min(this.width, this.height) * radius;
		while (true) {
			const ring: Vector2 = Random.gaussRing(ringRadius, clustering);
			ring.x += centerX;
			ring.y += centerY;
			if (this.isInRoom(ring)) {
				return ring;
			}
		}
	}

	public static isIn(type: string, location: Vector2): boolean {
		if (!this.isInRoom(location)) {
			return false;
		}
		const a: number = Math.floor(location.y * (this.ygrid / this.height));
		const row: string[] = this.setup[a];
		if (row === undefined) {
			return false;
		}
		const b: number = Math.floor(location.x * (this.xgrid / this.width));
		return row[b] === type;
	}

	public static isInNorm(location: Vector2): boolean {
		if (!this.isInRoom(location)) {
			return false;
		}
		const a: number = Math.floor(location.y * (this.ygrid / this.height));
		const row: string[] = this.setup[a];
		if (row === undefined) {
			return false;
		}
		const b: number = Math.floor(location.x * (this.xgrid / this.width));
		return row[b] !== "nest";
	}

	private static findType(type: string): void {
		const output: Vector2[] = [];
		for (let i: number = 0; i < this.setup.length; i++) {
			const row: string[] = this.setup[i];
			for (let j: number = 0; j < row.length; j++) {
				const cell: string = row[j];
				if (cell === type) {
					output.push({
						x: (i + 0.5) * this.width / this.xgrid,
						y: (j + 0.5) * this.height / this.ygrid
					});
				}
			}
		}
		this.spawnPoints.set(type, output);
	}
}
