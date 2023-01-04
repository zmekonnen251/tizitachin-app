import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	// server: {
	// 	proxy: {
	// 		'/api': {
	// 			target: 'https://tizitachin-api.fly.dev/api',
	// 			changeOrigin: false,
	// 			secure: true,
	// 			ws: true,
	// 		},
	// 	},
	// 	// port: 3000,
	// },
	plugins: [react()],

	build: {
		chunkSizeWarningLimit: 1600,
	},
});
