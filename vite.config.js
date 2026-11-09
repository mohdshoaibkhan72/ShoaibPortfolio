import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // three.js (the hero sphere) is a ~520 kB lazy chunk loaded after first paint — expected.
    chunkSizeWarningLimit: 600,
  },
})
