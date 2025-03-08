// Follow this url for conditional adatpers
// https://www.ryanfiller.com/blog/tips/conditional-sveltekit-adapters

import adapterVercel from '@sveltejs/adapter-vercel';
import adapterStatic from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import fs from 'fs';
import { generateSitemap } from './src/lib/utils/sitemap.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: process.env.ADAPTER === 'vercel' ? adapterVercel() : adapterStatic(),
		paths: {
			base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
		},
		// prerender: {
		// 	handleHttpError: ({ path, referrer, message }) => {
		// 		// Ignore 404 errors on /coffee-calculator/coffee-calculator/recipes
		// 		if (path === '/coffee-calculator/coffee-calculator/recipes') {
		// 			return; // do nothing
		// 		}

		// 		// Log or handle other errors as needed
		// 		console.error('Error prerendering', { path, referrer, message });
		// 	}
		// }
	}, 

	vite: {
		// Add this to generate sitemap.xml during build
		buildEnd() {
			console.log('Generating sitemap.xml');
			const sitemap = generateSitemap();
			console.log('sitemap', sitemap);
			fs.writeFileSync('static/sitemap.xml', sitemap);
		}
	}
};

export default config;
