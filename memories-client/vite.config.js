import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		proxy: {
			'/api': {
				target: 'https://tizitachin-api.fly.dev/api',
				changeOrigin: true,
				secure: false,
				ws: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
		port: 3000,
	},
	plugins: [react()],

	build: {
		chunkSizeWarningLimit: 1600,
	},
});
