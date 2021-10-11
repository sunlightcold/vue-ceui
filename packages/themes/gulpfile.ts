import { series, src, dest } from 'gulp';
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import autoprefixer from 'gulp-autoprefixer';
import cssmin from 'gulp-cssmin';
import { resolve } from 'path';
import { buildOutput } from '../../build/utils/path';

const distDir = resolve(__dirname, 'dist');
const distBundle = resolve(buildOutput, 'themes');

function compile() {
  const sass = gulpSass(dartSass);
  return src('src/*.scss')
    .pipe(sass.sync())
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(cssmin())
    .pipe(dest(distDir));
}

function copyThemeBundle() {
  return src(`${distDir}/**`).pipe(dest(distBundle));
}

export default series(compile, copyThemeBundle);
