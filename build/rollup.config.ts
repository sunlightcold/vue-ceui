import { nodeResolve } from '@rollup/plugin-node-resolve';
import type { RollupOptions } from 'rollup';
import vuePlugin from 'rollup-plugin-vue';
import tsPlugin from '@rollup/plugin-typescript';
import multiInput from 'rollup-plugin-multi-input';
import { absBuildOutput } from './utils/path';

export default {
  input: `packages/components/**/*.ts`,
  output: {
    dir: `${absBuildOutput}/es`,
    format: 'es',
    sourcemap: true,
    name: 'CEUI',
    entryFileNames: '[name].js',
  },
  external: ['vue'],
  plugins: [
    multiInput({ relative: 'packages/components/' }),
    vuePlugin({
      target: 'browser',
    }),
    tsPlugin({
      tsconfig: 'tsconfig.json',
    }),
    nodeResolve({
      extensions: ['.ts', '.js'],
    }),
  ],
} as RollupOptions;
