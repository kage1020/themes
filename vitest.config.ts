/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/tests/',
        '**/*.stories.{ts,tsx}',
        '**/*.test.{ts,tsx}',
        'dist/',
        '.storybook/',
        'vite.config.ts',
        'vitest.config.ts',
        'playwright.config.ts',
        'vitest.browser.config.ts',
        'vitest.shims.d.ts',
        'src/vite-env.d.ts',
        'src/types/',
        'src/index.ts',
      ]
    },
    include: ['src/tests/**/*.{test,spec}.{ts,tsx}'],
    exclude: [
      'node_modules',
      'dist',
      '.storybook',
    ],
  }
});
