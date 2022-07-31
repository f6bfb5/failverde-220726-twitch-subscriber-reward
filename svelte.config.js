// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter: adapter()
		adapter: adapter({
			pages: "build",
			assets: "build",
			fallback: null,
		}),
		paths: {
			base: "",
			assets: "",
		},
		prerender: {
			default: true
		}
	}
};

export default config;
