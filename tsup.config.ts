import { defineConfig } from "rollup";

export default defineConfig({
  entry: {
    index: 'src/node/cli.ts',
  },
  format: ['esm', 'cjs'],
  target: 'esnext',
  sourcemap: true,
  splitting: false
})
