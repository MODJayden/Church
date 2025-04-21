import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        format: 'es',
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'leaflet-vendor': ['leaflet', 'react-leaflet']
        }
      }
    },
    sourcemap: true,
    chunkSizeWarningLimit: 1000
  },
  server: {
    headers: {
      'Content-Type': 'application/javascript',
    },
    port: 5173,
    strictPort: true,
  },
  optimizeDeps: {
    include: ['leaflet', 'react-leaflet']
  }
});
