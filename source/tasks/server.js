'use strict';

const { task, watch, series, parallel } = require(`gulp`);
const { init, reload } = require(`browser-sync`).create();
const { source, build, server } = require(`../../package.json`);

task(`server`, () => {
  init({ server: build, ...server });

  watch(`${source}/**/*.njk`, series(parallel(`html`, `test:html`), `reload`));
  watch(`${source}/data/**/*.json`, series(parallel(`html`, `test:html`, `js`, `test:js`), `reload`));
  watch(`${source}/**/*.scss`, series(parallel(`css`, `test:css`), `reload`));
  watch(`${source}/**/*.ts`, series(parallel(`js`, `test:js`), `reload`));
  watch(`${source}/img/*.{jpg,png,svg}`, series(`img`, `reload`));
  watch(`${source}/img/icons/*.{svg,png}`, series(`img:icons`, parallel(`css`, `test:css`), `reload`));
  watch(`${source}/img/sprite/*.svg`, series(`img:sprite`, `reload`));
  watch(`${source}/static/**/*`, series(parallel(`build:copy`, `test:static`), `reload`));
  watch([`*.md`, `source/**/*.md`], series(`test:md`));
  watch([`gulpfile.js`, `${source}/tasks/**/*.js`], series(`test:gulp`));
});

task(`reload`, (done) => {
  reload();
  done();
});
