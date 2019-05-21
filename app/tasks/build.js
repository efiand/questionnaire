'use strict';

const { task, src, dest, series, parallel } = require(`gulp`);
const { changed } = require(`gulp-load-plugins`)();
const { build } = require(`../../package.json`);

const source = `source/static/**/*`;

task(`build:clean`, () => require(`del`)(build));

task(`build:copy`, () => src(source).pipe(changed(build)).pipe(dest(build)));

task(`build`, (done) => {
  const prepare = parallel(`test`, `build:clean`, `temp`);
  const assets = parallel(`build:copy`, `css`, `js`, `img`, `img:sprite`);
  return series(prepare, `img:icons`, assets, `html`)(done);
});
