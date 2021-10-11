import { parallel, series } from 'gulp';
import { buildOutput, pkgRoot } from './utils/path';
import { cleanDir } from './utils/gulp';
import { run } from './utils/process';
import { buildComponentTypes } from './component-types';
import path from 'path';

async function buildComponent() {
  await run(`pnpm run build:components`);
}

async function buildStyle() {
  await run(`pnpm run build:style`);
}

async function copyComponentTypes() {
  await run(`cp -R ${buildOutput}/types/components/* ${path.resolve(buildOutput, 'es')}`);
}

async function buildPack() {
  await run(`cp -R ${buildOutput}/* ${pkgRoot}/vue-ceui`);
}

const cleanDist = () => cleanDir(`${buildOutput}/*`);

export default series(
  parallel(cleanDist),
  buildComponentTypes,
  buildComponent,
  copyComponentTypes,
  buildStyle,
  buildPack,
);
