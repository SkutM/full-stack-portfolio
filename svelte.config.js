// svelte.config.js
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const base = process.env.BASE_PATH ?? '/full-stack-portfolio';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    paths: { base },
    prerender: {
      handleHttpError: 'warn', // prevent 404s from crashing build
	  handleUnseenRoutes: 'ignore',
      entries: ['*'] // ensure all routes are prerendered
    }
  }
};


export default config;
