'use strict';

const { task, src, dest } = require(`gulp`);
const { changed, imagemin, webp, svgstore } = require(`gulp-load-plugins`)();
const {
  source,
  build,
  temp,
  svgo,
  jpegoptim,
  webp: webpConfig,
  svgstore: svgstoreConfig
} = require(`../../package.json`);

const end = `${build}/img`;

task(`img`, () => {
  return src(`${source}/img/*.{jpg,png,svg}`)
    .pipe(changed(end))
    .pipe(imagemin([
      require(`imagemin-jpegoptim`)(jpegoptim),
      imagemin.optipng(),
      imagemin.svgo(svgo)
    ]))
    .pipe(dest(end))
    .pipe(webp(webpConfig))
    .pipe(dest(end));
});

task(`img:icons`, () => {
  return src(`${source}/img/icons/*.{png,svg}`)
    .pipe(imagemin([
      imagemin.optipng(),
      imagemin.svgo(svgo)
    ]))
    .pipe(dest(`${temp}/icons`));
});

task(`img:sprite`, () => {
  return src(`${source}/img/sprite/*.svg`)
    .pipe(imagemin([imagemin.svgo(svgo)]))
    .pipe(svgstore(svgstoreConfig))
    .pipe(dest(end));
});
