import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/https://github.com/lawrencemasilo/fhc-app.git',
  plugins: [
    tailwindcss(),
  ],
})