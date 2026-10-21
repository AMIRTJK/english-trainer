/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// Relative base keeps the build working on GitHub Pages sub-paths and on Vercel root.
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@content': fileURLToPath(new URL('./content', import.meta.url)),
    },
  },
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor';
          // Each level is its own chunk, fetched when it becomes active. Its
          // meta (the level list) and the paper-test record are tiny and needed
          // before any level loads, so they stay in the shared content chunk.
          const eager = id.endsWith('/meta.ts') || id.includes('imported-quick-test');
          if (!eager && id.includes('/content/beginner/')) return 'content-beginner';
          if (!eager && id.includes('/content/elementary/')) return 'content-elementary';
          if (id.includes('/content/')) return 'content';
          return undefined;
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx'],
    setupFiles: ['tests/setup-content.ts'],
  },
});
