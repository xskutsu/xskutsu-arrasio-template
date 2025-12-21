enum TerminalColors {
	Reset = "\x1b[0m",
	Gray = "\x1b[90m",
	Yellow = "\x1b[33m",
	Red = "\x1b[31m"
}

export class Logger {
	public static getTime(): string {
		const now: Date = new Date();
		const utc: string = now.toISOString();
		const local: string = now.toLocaleString("sv-SE", {
			timeZoneName: "short"
		});
		const text: string = utc + " | local=" + local;
		return process.stdout.isTTY ? TerminalColors.Gray + text + TerminalColors.Reset : text;
	}

	public static info(text: string): void {
		console.log(this.getTime() + " | INFO  | " + text);
	}

	public static warn(text: string): void {
		const tag: string = process.stdout.isTTY ? TerminalColors.Yellow + "WARN" + TerminalColors.Reset : "WARN";
		console.warn(this.getTime() + " | " + tag + "  | " + text);
	}

	public static error(text: string): void {
		const tag: string = process.stdout.isTTY ? TerminalColors.Red + "ERROR" + TerminalColors.Reset : "ERROR";
		console.error(this.getTime() + " | " + tag + " | " + text);
	}
}
