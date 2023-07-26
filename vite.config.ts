// https://vitejs.dev/config/
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import mkcert from 'vite-plugin-mkcert'
import svgLoader from 'vite-svg-loader'
import checker from 'vite-plugin-checker'

const checkerConfig = {
  typescript: true,
  eslint: {
    lintCommand: 'eslint "src/**/*.{ts,js,vue}"',
  },
}

export default defineConfig({
  plugins: [vue(), mkcert(), svgLoader(), checker(checkerConfig)],
  server: {
    open: true,
    https: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variables.scss";',
      },
    },
  },
})
