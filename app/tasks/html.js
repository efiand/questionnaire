'use strict';

const { task, src, dest, series } = require(`gulp`);
const {
  plumber,
  data,
  nunjucksRender,
  htmlhint,
  htmlmin,
  w3cHtmlValidator
} = require(`gulp-load-plugins`)();
const {
  source,
  build,
  htmlhint: htmlhintConfig,
  htmlmin: htmlminConfig
} = require(`../../package.json`);

const getJson = (json) => JSON.parse(require(`fs`).readFileSync(json));
const exec = require(`child_process`).exec;

task(`html:compile`, () => {
  return src(`${source}/pages/**/*.njk`)
    .pipe(plumber())
    .pipe(data((page) => {
      const pageName = require(`path`).win32.basename(page.path, `.njk`);

      return {
        ...getJson(`${source}/data/project.json`),
        ...getJson(`${source}/data/pages/${pageName}.json`),
        source,
        isDev: !process.env.NODE_ENV,
        template: `${source}/templates/layout.njk`
      };
    }))
    .pipe(nunjucksRender({
      manageEnv: (env) => {
        env.opts.autoescape = false;
        env.addFilter(`bem`, (str, blockName) => {
          return str.replace(/&(\-\-|__)/g, `${blockName}$1`);
        });
        env.addFilter(`blockPath`, (blockName, macro = ``) => {
          return `${source}/blocks/${blockName}/${macro || blockName}.njk`;
        });
      }
    }))
    .pipe(htmlhint(htmlhintConfig))
    .pipe(htmlhint.reporter())
    .pipe(htmlmin(htmlminConfig))
    .pipe(dest(build))
    .pipe(w3cHtmlValidator())
    .pipe(w3cHtmlValidator.reporter());
});

task(`bem:validate`, (done) => {
  exec(`npm run bem:validate`, (err, stdout, stderr) => {
    console.log(stdout); // eslint-disable-line
    console.log(stderr); // eslint-disable-line
    done(err);
  });
});

task(`html`, series(`html:compile`, `bem:validate`));
