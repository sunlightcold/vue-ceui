import { spawn } from 'child_process';
import { projRoot } from './path';

export const run = async (command: string, cwd: string = projRoot) =>
  new Promise<void>((resolve, reject) => {
    const args = command.split(' ');
    const cmd = args.shift()!;

    const app = spawn(cmd, args, {
      cwd,
      stdio: 'inherit',
      shell: true,
    });

    const onProcessExit = () => app.kill('SIGHUP');

    app.on('close', (code) => {
      process.removeListener('exit', onProcessExit);

      if (code === 0) resolve();
      else reject(new Error(`Command failed. \n Command: ${command} \n Code: ${code}`));
    });
    process.on('exit', onProcessExit);
  });
