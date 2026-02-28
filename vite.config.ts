import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/happy-54th-birthday-daddy/',
  server: {
    host: true, // Expose to local network
  }
})
