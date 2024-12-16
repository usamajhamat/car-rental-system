
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy any API request to the backend server
      '/api': {
        target: 'http://localhost:8080',  // Replace with the backend's URL
   
      },
    },
  },
})
