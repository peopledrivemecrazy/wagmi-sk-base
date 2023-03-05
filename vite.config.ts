import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import inject from '@rollup/plugin-inject';
import nodePolyfills from 'rollup-plugin-polyfill-node';
export default defineConfig({
	plugins: [
		sveltekit(),
		inject({
			util: 'util/'
		})
	],
	build: {
		rollupOptions: {
			plugins: [nodePolyfills()]
		},
		commonjsOptions: {
			transformMixedEsModules: true
		}
	},

	optimizeDeps: {
		esbuildOptions: {
			define: {
				global: 'globalThis'
			},
			plugins: [
				NodeGlobalsPolyfillPlugin({
					buffer: true,
					process: true
				})
			]
		}
	}
	// resolve: {
	// 	alias: {
	// 		Buffer: 'vite-compatible-readable-buffer'
	// 		// stream: 'vite-compatible-readable-stream',
	// 		// process: 'process/browser',
	// 		// stream: 'stream-browserify',
	// 		// zlib: 'browserify-zlib',
	// 		// util: 'util'
	// 	}
	// }
});
