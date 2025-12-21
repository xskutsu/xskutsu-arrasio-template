import { Vector2 } from "../types/Vector2";

const PI: number = Math.PI;
const TAU: number = Math.PI * 2;

export function cyrb128(text: string): [number, number, number, number] {
	let h1: number = 1779033703;
	let h2: number = 3144134277;
	let h3: number = 1013904242;
	let h4: number = 2773480762;
	for (let i: number = 0, k; i < text.length; i++) {
		k = text.charCodeAt(i);
		h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
		h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
		h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
		h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
	}
	h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
	h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
	h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
	h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
	return [
		(h1 ^ h2 ^ h3 ^ h4) >>> 0,
		(h2 ^ h1) >>> 0,
		(h3 ^ h1) >>> 0,
		(h4 ^ h1) >>> 0
	];
}

export function sfc32factory(seed: string): () => number {
	let [a, b, c, d] = cyrb128(seed);
	return function (): number {
		a |= 0; b |= 0; c |= 0; d |= 0;
		let t = (a + b | 0) + d | 0;
		d = (d + 1) | 0;
		a = b ^ (b >>> 9);
		b = (c + (c << 3)) | 0;
		c = (c << 21) | (c >>> 11);
		c = (c + t) | 0;
		return (t >>> 0) / 4294967296;
	}
}

const rng: () => number = sfc32factory(Date.now().toString());

export function random(value: number): number {
	return value * rng();
}

export function randomAngle(): number {
	return TAU * rng();
}

export function randomRange(min: number, max: number): number {
	return rng() * (max - min) + min;
}

export function irandom(i: number): number {
	const max = Math.floor(i);
	return Math.floor(rng() * (max + 1));
}

let isGuassNext: boolean = false;
let guassNextValue: number = 0;
export function gauss(mean: number, deviation: number): number {
	if (isGuassNext) {
		isGuassNext = false;
		return mean + deviation * guassNextValue;
	}
	let x1: number = 0;
	let x2: number = 0;
	let w: number = 1;
	do {
		x1 = 2 * rng() - 1;
		x2 = 2 * rng() - 1;
		w = x1 * x1 + x2 * x2;
	} while (w == 0 || w >= 1);
	w = Math.sqrt(-2 * Math.log(w) / w);
	isGuassNext = true;
	guassNextValue = x2 * w;
	return mean + deviation * x1 * w;
}

export function gaussInverse(min: number, max: number, clustering: number): number {
	const range: number = max - min;
	let output: number = gauss(0, range / clustering);
	if (output < 0 || output > range) {
		output = ((output % range) + range) % range;
	}
	return output + min;
};

export function gaussRing(radius: number, clustering: number): Vector2 {
	const distance: number = gauss(radius, radius * clustering);
	const angle: number = randomAngle();
	return {
		x: distance * Math.cos(angle),
		y: distance * Math.sin(angle)
	};
}

export function chance(probability: number): boolean {
	return rng() < probability;
}

export function dice(sides: number): boolean {
	return random(sides) < 1;
}

export function choose<T>(array: T[]): T {
	return array[Math.floor((rng() * array.length))];
}

export function chooseN<T>(array: T[], n: number): T[] {
	const o: T[] = [];
	for (let i: number = 0; i < n; i++) {
		if (array.length === 0) {
			break;
		}
		const idx: number = Math.floor(rng() * array.length);
		const spliced = array.splice(idx, 1);
		o.push(spliced[0]);
	}
	return o;
}

export function chooseChance(weights: number[]): number {
	let total: number = 0;
	for (let i: number = 0; i < weights.length; i++) {
		total += weights[i];
	}
	let answer = random(total);
	for (let i: number = 0; i < weights.length; i++) {
		if (answer < weights[i]) {
			return i;
		}
		answer -= weights[i];
	}
	return 0;
}
