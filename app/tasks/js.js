'use strict';

const { task, src, series, dest } = require(`gulp`);
const { concat } = require(`gulp-load-plugins`)();
const { source, vendors, build, temp } = require(`../../package.json`);

const isDev = !process.env.NODE_ENV;

task(`ts`, async () => {
  const compile = await require(`rollup`).rollup({
    input: `${source}/js/script.ts`,
    plugins: [
      require(`rollup-plugin-replace`)({ isDev }),
      require(`rollup-plugin-typescript`)(),
      require(`rollup-plugin-uglify`).uglify({
        output: { comments: false }
      })
    ]
  });

  await compile.write({
    file: `${temp}/script.js`,
    format: `iife`,
    sourcemap: isDev
  });
});

task(`vendors`, () => {
  return src([...vendors, `${temp}/script.js`])
    .pipe(concat(`script.min.js`))
    .pipe(dest(`${build}/js`))
});

task(`js`, series(`ts`, `vendors`));
