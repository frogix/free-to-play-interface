import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer';

import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	return {
		base: mode === "production" ? "/free-to-play-interface/" : "",
		plugins: [
			react(),
			visualizer({ open: true, gzipSize: true })
		],
	}
})
