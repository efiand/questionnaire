'use strict';

const { task, src, parallel } = require(`gulp`);
const {
  plumber,
  lintspaces,
  stylelint,
  eslint,
  remarkLintDko
} = require(`gulp-load-plugins`)();
const {
  source,
  stylelint: stylelintConfig,
  eslint: eslintConfig,
  tslint,
  editorconfig,
  remarkLint
} = require(`../../package.json`);

task(`test:html`, () => {
  return src(`${source}/**/*.njk`)
    .pipe(plumber())
    .pipe(lintspaces(editorconfig))
    .pipe(lintspaces.reporter());
});

task(`test:css`, () => {
  return src(`${source}/**/*.scss`)
    .pipe(plumber())
    .pipe(stylelint(stylelintConfig))
    .pipe(lintspaces(editorconfig))
    .pipe(lintspaces.reporter());
});

task(`test:js`, () => {
  return src(`${source}/**/*.ts`)
    .pipe(plumber())
    .pipe(eslint({ ...eslintConfig, ...tslint }))
    .pipe(eslint.format())
    .pipe(lintspaces(editorconfig))
    .pipe(lintspaces.reporter());
});

task(`test:static`, () => {
  return src(`${source}/static/**/*.{txt,html,xml,svg,php,css,js,json}`)
    .pipe(plumber())
    .pipe(lintspaces(editorconfig))
    .pipe(lintspaces.reporter());
});

task(`test:md`, () => {
  return src([`*.md`, `${source}/**/*.md`])
    .pipe(plumber())
    .pipe(remarkLintDko(remarkLint))
    .pipe(remarkLintDko.report())
    .pipe(lintspaces(editorconfig))
    .pipe(lintspaces.reporter());
});

task(`test:gulp`, () => {
  return src([`gulpfile.js`, `${source}/tasks/**/*.js`])
    .pipe(plumber())
    .pipe(eslint(eslintConfig))
    .pipe(eslint.format())
    .pipe(lintspaces(editorconfig))
    .pipe(lintspaces.reporter());
});

task(`test`, parallel(`test:html`, `test:css`, `test:js`, `test:static`, `test:md`, `test:gulp`));
