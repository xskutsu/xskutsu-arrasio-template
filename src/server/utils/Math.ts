import { Vector2 } from "../types/Vector2";

const PI: number = Math.PI;
const TAU: number = Math.PI * 2;

export function getDistance(a: Vector2, b: Vector2): number {
	const distanceX: number = b.x - a.x;
	const distanceY: number = b.y - a.y;
	return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
}

export function angleDifference(sourceAngle: number, targetAngle: number): number {
	const angle: number = targetAngle - sourceAngle;
	let difference: number = (angle + PI) % TAU;
	if (difference < 0) {
		difference += TAU;
	}
	return difference - TAU;
}

export function loopSmooth(angle: number, desiredAngle: number, slowness: number): number {
	return angleDifference(angle, desiredAngle) / slowness;
}

export function clamp(value: number, min: number, max: number): number {
	if (value < min) {
		return min;
	}
	if (value > max) {
		return max;
	}
	return value;
}
