import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true, // Enable sourcemaps in production for easier debugging
    rollupOptions: {
      output: {
        // manualChunks: Function to control code splitting for better caching and loading performance
        manualChunks: (id) => {
          // Vendor chunks: Separate third-party libraries into chunks for better caching
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor' // React core libraries
            }
            if (id.includes('firebase')) {
              return 'firebase-vendor' // Firebase SDKs
            }
            if (id.includes('react-router')) {
              return 'router-vendor' // React Router for navigation
            }
            // Other large libraries: Group utility libraries together
            if (id.includes('@google-cloud') || id.includes('lodash') || id.includes('axios')) {
              return 'utils-vendor'
            }
            return 'vendor' // Catch-all for remaining node_modules
          }
          // Application chunks: Split app code for lazy loading
          if (id.includes('/pages/')) {
            return 'pages' // Page components loaded on demand
          }
          if (id.includes('/components/')) {
            return 'components' // Reusable UI components
          }
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    minify: 'terser', // Use Terser for JavaScript minification
    terserOptions: {
      compress: {
        drop_console: true, // Remove console statements in production
        drop_debugger: true, // Remove debugger statements
        pure_funcs: ['console.log', 'console.info', 'console.debug'], // Remove additional console methods
        passes: 2, // Run compression multiple times for better results
      },
      mangle: {
        safari10: true, // Workaround for Safari 10/11 bugs with variable mangling
      },
    },
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
})
