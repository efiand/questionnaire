'use strict';

const { task, src, dest } = require(`gulp`);
const {
  if: gulpIf,
  plumber,
  sourcemaps,
  sass,
  combineMq,
  postcss,
  rename
} = require(`gulp-load-plugins`)();
const { source, build } = require(`../../package.json`);

const isDev = !process.env.NODE_ENV;

task(`css`, () => {
  return src(`${source}/sass/style.scss`)
    .pipe(plumber())
    .pipe(gulpIf(isDev, sourcemaps.init()))
    .pipe(sass())
    .pipe(combineMq())
    .pipe(postcss([
      require(`autoprefixer`)(),
      require(`postcss-csso`)({ comments: false })
    ]))
    .pipe(rename({ suffix: `.min` }))
    .pipe(gulpIf(isDev, sourcemaps.write(``)))
    .pipe(dest(`${build}/css`));
});
