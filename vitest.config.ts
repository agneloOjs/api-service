import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/__tests__/**/*.{test,spec}.{js,mjs,cjs}'],
    globals: true,
    environment: 'node',
    coverage: {
      reporter: ['text', 'html']
    }
  }
});
