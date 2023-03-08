import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/books': {
        target: "https://sfof9o2xn8.execute-api.us-east-1.amazonaws.com",
        // target: 'localhost:5173',
        changeOrigin: true
      }
    }
  }
})
