'use strict';

const { task } = require(`gulp`);
const { source, build } = require(`../../package.json`);

// Повторное считывание для применения без перезапуска сборки
const { readFileSync } = require(`fs`);
const projectSrc = `${source}/data/project.json`;
const DATA = () => JSON.parse(readFileSync(projectSrc)).js;

task(`js`, async () => {
  const compile = await require(`rollup`).rollup({
    input: `${source}/js/script.ts`,
    plugins: [
      require(`rollup-plugin-replace`)(DATA()),
      require(`rollup-plugin-typescript`)(),
      require(`rollup-plugin-uglify`).uglify({
        output: { comments: false }
      })
    ]
  });

  await compile.write({
    file: `${build}/js/script.min.js`,
    format: `iife`,
    sourcemap: !process.env.NODE_ENV
  });
});
