import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Hospital_Management_System/'   // ⚠️ VERY IMPORTANT
})