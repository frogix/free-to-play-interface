import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer';

import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	return {
		base: mode === "production" ? "/free-to-play-interface/" : "",
		plugins: [
			react(),
			visualizer({ 
				open: true, 
				gzipSize: true,
				filename: 'dist/stats.html'
			})
		],
		build: {
			target: 'es2015',
			minify: 'esbuild',
			cssMinify: true,
			rollupOptions: {
				output: {
					manualChunks: {
						'react-vendor': ['react', 'react-dom', 'react-router-dom'],
						'antd-vendor': ['antd'],
						'antd-icons': ['@ant-design/icons'],
						'blurhash-vendor': ['blurhash', 'react-blurhash']
					},
					chunkFileNames: 'assets/js/[name]-[hash].js',
					entryFileNames: 'assets/js/[name]-[hash].js',
					assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
				}
			},
			chunkSizeWarningLimit: 1000
		}
	}
})
