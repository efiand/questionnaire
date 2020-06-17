'use strict';

const { task, src, dest } = require(`gulp`);
const {
  cssBase64,
  if: gulpIf,
  plumber,
  sourcemaps,
  sass,
  postcss,
  rename
} = require(`gulp-load-plugins`)();
const { source, build, base64 } = require(`../../package.json`);

const isDev = !process.env.NODE_ENV;

task(`css`, () => {
  return src(`${source}/sass/style.scss`)
    .pipe(plumber())
    .pipe(gulpIf(isDev, sourcemaps.init()))
    .pipe(sass())
    .pipe(postcss([
      require(`mqpacker`),
      require(`autoprefixer`)(),
      require(`cssnano`)()
    ]))
    .pipe(cssBase64(base64))
    .pipe(rename({ suffix: `.min` }))
    .pipe(gulpIf(isDev, sourcemaps.write(``)))
    .pipe(dest(`${build}/css`));
});
