import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import react from '@vitejs/plugin-react'
// import path from 'path';
import tailwindcss from '@tailwindcss/vite'
// Get __dirname equivalent in ES modules
const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    // ApexCharts alone is ~580 kB and is lazy-loaded in its own chunk (see AppLayout),
    // so the default 500 kB limit would always warn. Any other chunk over 600 kB still will.
    chunkSizeWarningLimit: 600,
  },
})
