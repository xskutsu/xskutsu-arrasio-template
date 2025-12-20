import { Vector2 } from "../types/Vector2";

export class Vector implements Vector2 {
	public x: number;
	public y: number;
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	public zero(): void {
		this.x = 0;
		this.y = 0;
	}

	public get length() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	public get direction() {
		return Math.atan2(this.y, this.x);
	}
}
