import clean from 'gulp-clean';
import { src } from 'gulp';

export function cleanDir(dir: string) {
  return src(dir, { read: false, allowEmpty: true }).pipe(
    clean({ force: true })
  );
}
