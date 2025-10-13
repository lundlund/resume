// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    mdx(),        // MDX support (.mdx filer bliver til React-komponenter)
    react(),      // React Fast Refresh, JSX, osv.
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // import ... from '@/...'
    },
  },
  server: {
    port: 5173,
    open: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
