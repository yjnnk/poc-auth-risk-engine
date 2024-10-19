// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  define: {
    "process.env": {
      NODE_ENV: "production",
    },
  },
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/webComponent.tsx'),
      name: 'RiskMFE',
      fileName: (format) => `risk-mfe.${format}.js`,
      formats: ['es'], // Use o formato ES Module

      
    }

  },

});