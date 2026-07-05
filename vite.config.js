import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves at /<repo-name>/ — must match your repo name exactly
  base: '/GlobeTrax/',
  // Keep Vite's dep cache out of OneDrive to avoid EPERM file-lock errors
  cacheDir: `${process.env.LOCALAPPDATA || 'node_modules'}/vite-cache/globetrax`,
})
