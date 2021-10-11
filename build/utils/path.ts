import { resolve } from 'path';

export const projRoot = resolve(__dirname, '..', '..');
export const pkgRoot = resolve(projRoot, 'packages');
export const buildRoot = resolve(projRoot, 'build');
export const compRoot = resolve(pkgRoot, 'components');
export const themeRoot = resolve(pkgRoot, 'themes');

/** dist */
export const buildOutput = resolve(projRoot, 'dist');

export const absCompEntry = `packages/components/index.ts`;
export const absBuildOutput = `dist`;
