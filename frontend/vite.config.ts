import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import windicss from 'vite-plugin-windicss'

export default defineConfig({
  
  plugins: [
    react(),

    windicss({
      // Options for the WindiCSS plugin
      // See https://windicss.org/guide/configuration.html
    }),
  ],

  server: {

    watch: {
      usePolling: true,
    },

    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    port: 3000, // you can replace this port with any port
  },

  resolve: {
    // Add ".jsx" and ".tsx" as extensions to resolve
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
  },

  optimizeDeps: {
    // Add the "react-router-dom" package as a dependency
    include: ['react-router-dom'],
  },
})