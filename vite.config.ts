import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
  port: 3000
  },
  resolve: {
    alias: {
    '@public': path.resolve(__dirname, 'public'),
    '@entities': path.resolve(__dirname, 'src/entities'),
    '@shared': path.resolve(__dirname, 'src/shared'),
    '@widgets': path.resolve(__dirname, 'src/widgets'),
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@features': path.resolve(__dirname, 'src/features'),
    '@app': path.resolve(__dirname, 'src/app'),
    },
    },
})
