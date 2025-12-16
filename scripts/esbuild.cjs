const esbuild = require("esbuild");
const isWatch = process.argv.includes("--watch");
const banner = `
This code is licensed under the GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007.

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
		outfile: "dist/client/bundle.js",
		platform: "browser",
		minify: true,
		tsconfig: "./src/client/tsconfig.json"
	});
	const serverContext = await build({
		entryPoints: ["./src/server/src/index.js"],
		sourcesContent: false,
		format: "esm",
		outfile: "dist/server/bundle.js",
		platform: "node",
		packages: "external",
		tsconfig: "./src/server/tsconfig.json"
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
