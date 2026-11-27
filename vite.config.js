import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    // Raise the chunk-size warning threshold — icon libraries are intentionally large
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React runtime — cached aggressively
          vendor: ['react', 'react-dom'],
          // Animation libs together — both needed early
          motion: ['framer-motion', 'gsap'],
          // Icon sets split from app code — rarely change
          icons: ['react-icons'],
        },
      },
    },
  },
})
