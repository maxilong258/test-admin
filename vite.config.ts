import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { join } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': join(__dirname, "src"),
    }
  },
  server: {
    port: 4000,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        // changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})
