import { sveltekit } from '@sveltejs/kit/vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
		resolve: {
			alias: {
				$stores: resolve(__dirname, './src/stores')
			}
		},
};

export default config;
