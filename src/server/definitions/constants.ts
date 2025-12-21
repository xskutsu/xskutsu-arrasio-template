import { LAZY_REAL_SIZES_LIMIT } from "../config";

export const lazyRealSizes: number[] = [1, 1, 1];
for (let i: number = 3; i < LAZY_REAL_SIZES_LIMIT; i++) {
	const angle: number = Math.PI * 2 / i;
	lazyRealSizes[i] = Math.sqrt(angle / Math.sin(angle));
}
