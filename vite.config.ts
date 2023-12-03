import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __MAPTILER__: `"${process.env.MAPTILER}"`,
  },
  build: {
    outDir: 'docs',
  },
})
