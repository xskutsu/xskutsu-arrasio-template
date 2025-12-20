export function addArticle(text: string): string {
	const lower: number = text.charCodeAt(0) | 32;
	if (
		lower === 97 || //  a
		lower === 101 || // e
		lower === 105 || // i
		lower === 111 || // o
		lower === 117 //    u
	) {
		return "an " + text;
	}
	return "a " + text;
}
