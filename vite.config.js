import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// The base path can be configured via VITE_BASE_PATH environment variable (e.g. for GitHub Pages: /<repo-name>/)
// Defaults to './' so assets work with relative paths across any repository name or custom domain.
export default defineConfig({
  base: process.env.VITE_BASE_PATH || './',
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  }
})
