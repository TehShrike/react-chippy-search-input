import esbuild from 'esbuild'

const build = async({ watch }) => {
	const context = await esbuild.context({
		entryPoints: [ `./src/index.ts` ],
		bundle: true,
		treeShaking: true,
		minify: true,
		outdir: `public/`,
		platform: `browser`,
		format: `esm`,
		sourcemap: true,
	})

	await context.rebuild()

	if (watch) {
		await context.watch()
	} else {
		await context.dispose()
	}
}

const [ , , ...rest ] = process.argv

const watch = rest.some(arg => arg === '--watch')

build({ watch }).catch(error => {
	console.error(error.message)
	console.error(error.stack)
	process.exit(1)
})
