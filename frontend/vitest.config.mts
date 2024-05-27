import react from '@vitejs/plugin-react'
import { config } from 'dotenv'
import { resolve } from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'istanbul',
      exclude: [
        '**/src/lib/**',
        '**/node_modules/**',
        '**/.next/**',
        '**/.{idea,git,cache,output,temp}/**',
        '**/src/styles/**',
        '**.config.{mjs,ts}',
        '**/src/env.ts',
      ],
    },
    exclude: [
      '**/node_modules/**',
      '**/.next/**',
      '**/.{idea,git,cache,output,temp}/**',
    ],
    setupFiles: [resolve(__dirname, 'src/utils/tests/setup.ts')],
    env: {
      ...config({ path: '.env.development' }).parsed,
    },
  },
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, './src') }],
  },
})
