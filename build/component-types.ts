import path from 'path';
import * as fs from 'fs/promises';
import * as vueCompiler from '@vue/compiler-sfc';
import { Project } from 'ts-morph';
import { buildOutput, compRoot, projRoot } from './utils/path';
import glob from 'fast-glob';
import type { SourceFile } from 'ts-morph';

const TSCONFIG_PATH = path.resolve(projRoot, 'tsconfig.json');
const outDir = path.resolve(buildOutput, 'types');

async function getFilePaths() {
  const excludedFiles = [
    /\/demo\/\w+\.vue$/,
    /__test__|__tests__/,
    'mock',
    'package.json',
    'spec',
    'test',
    'tests',
    'css',
    '.DS_Store',
    'node_modules',
  ];

  const allFilePaths = await glob('**/*', {
    cwd: compRoot,
    onlyFiles: true,
    absolute: true,
  });
  const filePaths = allFilePaths.filter(
    (path) =>
      !excludedFiles.some((f) =>
        f instanceof RegExp ? f.test(path) : path.includes(f)
      )
  );

  return filePaths;
}

export const buildComponentTypes = async () => {
  const project = new Project({
    compilerOptions: {
      allowJs: true,
      declaration: true,
      emitDeclarationOnly: true,
      noEmitOnError: true,
      outDir,
      baseUrl: projRoot,
      paths: {
        '@vue-ceui/*': ['packages/*'],
      },
      skipLibCheck: true,
      strict: false,
    },
    tsConfigFilePath: TSCONFIG_PATH,
    skipAddingFilesFromTsConfig: true,
  });
  const filePaths = await getFilePaths();
  const sourceFiles: SourceFile[] = [];

  await Promise.all(
    filePaths.map(async (file) => {
      if (file.endsWith('.vue')) {
        const content = await fs.readFile(file, 'utf-8');
        const sfc = vueCompiler.parse(content);
        const { script, scriptSetup } = sfc.descriptor;
        if (script || scriptSetup) {
          let content = '';
          let isTS = false;
          if (script && script.content) {
            content += script.content;
            if (script.lang === 'ts') isTS = true;
          }
          if (scriptSetup) {
            const compiled = vueCompiler.compileScript(sfc.descriptor, {
              id: 'xxx',
            });
            content += compiled.content;
            if (scriptSetup.lang === 'ts') isTS = true;
          }
          const sourceFile = project.createSourceFile(
            path.relative(process.cwd(), file) + (isTS ? '.ts' : '.js'),
            content
          );
          sourceFiles.push(sourceFile);
        }
      } else if (file.endsWith('.ts')) {
        const sourceFile = project.addSourceFileAtPath(file);
        sourceFiles.push(sourceFile);
      }
    })
  );

  const diagnostics = project.getPreEmitDiagnostics();

  // 输出解析过程中的错误信息
  console.log(project.formatDiagnosticsWithColorAndContext(diagnostics));

  await project.emit({
    emitOnlyDtsFiles: true,
  });

  const tasks = sourceFiles.map(async (sourceFile) => {
    const emitOutput = sourceFile.getEmitOutput();
    const tasks = emitOutput.getOutputFiles().map(async (outputFile) => {
      const filepath = outputFile.getFilePath();
      await fs.mkdir(path.dirname(filepath), {
        recursive: true,
      });

      await fs.writeFile(filepath, outputFile.getText(), 'utf8');
    });
    await Promise.all(tasks);
  });

  await Promise.all(tasks);
};
