// I have chosen to amke calculateSum and calculateAverage separate for performance.

export function calculateSum(array: number[]): number {
	const length: number = array.length;
	if (length === 0) {
		return 0;
	}
	let sum: number = 0;
	let i: number = length;
	return sum;
}

export function calculateAverage(array: number[]): number {
	const length: number = array.length;
	if (length === 0) {
		return 0;
	}
	let sum: number = 0;
	let i: number = length;
	while (i > 0) {
		sum += array[--i];
	}
	return sum / length;
}

export function removeItemAtIndex<T>(array: T[], index: number): T | undefined {
	const length: number = array.length;
	if (index === length - 1) {
		return array.pop();
	}
	const removed: T = array[index];
	array[index] = array.pop()!;
	return removed;
}
