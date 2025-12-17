const esbuild = require("esbuild");
const { spawn } = require("node:child_process");
const isWatch = process.argv.includes("--watch");
const isRun = process.argv.includes("--run");
const banner = `
// This code is licensed under the GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007.

"use strict";
`.trim();

async function build(config) {
	return await esbuild.context({
		bundle: true,
		target: "es2024",
		sourcemap: true,
		banner: {
			js: banner
		},
		...config
	});
}

(async function () {
	console.log("Starting building...");
	const clientContext = await build({
		entryPoints: ["./src/client/src/index.js"],
		sourcesContent: false,
		format: "iife",
		outfile: "public/js/client-bundle.js",
		platform: "browser",
		minify: true,
		tsconfig: "./src/client/tsconfig.json"
	});
	if (isRun) {
		console.log("Run enabled, server will auto restart on changes.");
	}
	let serverProcess;
	const serverContext = await build({
		entryPoints: ["./src/server/src/index.js"],
		sourcesContent: false,
		format: "cjs",
		outfile: "dist/server-bundle.js",
		platform: "node",
		packages: "external",
		tsconfig: "./src/server/tsconfig.json",
		plugins: isRun ? [{
			name: "run-server",
			setup(build) {
				build.onEnd(result => {
					if (result.errors.length > 0) return;
					if (serverProcess) {
						serverProcess.kill();
					}
					serverProcess = spawn("node", ["dist/server-bundle.js"], {
						stdio: "inherit",
						shell: false
					});
				});
			},
		}] : []
	});
	console.log("Esbuild contexts established.");
	if (isWatch) {
		console.log("Starting watch...");
		await clientContext.watch();
		await serverContext.watch();
		console.log("Wathcing for changes in client and server.");
	} else {
		await clientContext.rebuild();
		await clientContext.dispose();
		await serverContext.rebuild();
		await serverContext.dispose();
		console.log("Build complete.");
	}
})();
