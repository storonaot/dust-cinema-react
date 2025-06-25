import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const appName = process.env.VITE_APP_NAME || 'DUST CINEMA'
const port = parseInt(process.env.VITE_PORT || '3001')

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port,
  },
  clearScreen: false, // Чтобы логи не скрывались
  define: {
    __APP_NAME__: JSON.stringify(appName),
  },
})
