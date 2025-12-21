import { Vector2 } from "../types/Vector2";

export function timeOfImpact(position: Vector2, velocity: Vector2, speed: number): number {
	const px: number = position.x;
	const py: number = position.y;
	const vx: number = velocity.x;
	const vy: number = velocity.y;
	const speedDifferenceSquared: number = speed * speed - (vx * vx + vy * vy);
	const positionVelocityDot: number = px * vx + py * vy
	const positionLengthSquared: number = px * px + py * py;
	const discriminant: number = positionVelocityDot * positionVelocityDot + speedDifferenceSquared * positionLengthSquared;
	if (discriminant >= 0) {
		const timeToImpact: number = (positionVelocityDot + Math.sqrt(discriminant)) / speedDifferenceSquared;
		return (timeToImpact > 0 ? timeToImpact : 0) * 0.9;
	}
	return 0;
}

export function determineNearest<T extends Vector2>(array: T[], location: Vector2, test: (item: T, distanceSquared: number) => boolean = () => true): T | undefined {
	let winner: T | undefined;
	let shortestDistanceSquared: number = Infinity;
	const locationX: number = location.x;
	const locationY: number = location.y;
	for (let i: number = 0; i < array.length; i++) {
		const instance: T = array[i];
		const distanceX: number = instance.x - locationX;
		const distanceY: number = instance.y - locationY;
		const distanceSquared: number = distanceX * distanceX + distanceY * distanceY;
		if (distanceSquared < shortestDistanceSquared) {
			if (test(instance, distanceSquared)) {
				shortestDistanceSquared = distanceSquared;
				winner = instance;
			}
		}
	}
	return winner;
}
