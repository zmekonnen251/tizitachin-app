import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:5000/api',
				changeOrigin: true,
				secure: false,
				ws: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
		port: 3000,
	},
	plugins: [react()],
});
