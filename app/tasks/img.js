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

const img = {
  source: [`${source}/img/*.{jpg,png,svg}`],
  sprite: `${source}/img/sprite/*.svg`,
  build: `${build}/img`
};
if (!process.env.NODE_ENV) {
  img.source.push(`${temp}/previews/**/*.jpg`);
}

task(`img`, () => {
  return src(img.source)
    .pipe(changed(img.build))
    .pipe(imagemin([
      require(`imagemin-jpegoptim`)(jpegoptim),
      imagemin.optipng(),
      imagemin.svgo(svgo)
    ]))
    .pipe(dest(img.build))
    .pipe(webp(webpConfig))
    .pipe(dest(img.build));
});

task(`img:sprite`, () => {
  return src(img.sprite)
    .pipe(imagemin([imagemin.svgo(svgo)]))
    .pipe(svgstore(svgstoreConfig))
    .pipe(dest(img.build));
});
