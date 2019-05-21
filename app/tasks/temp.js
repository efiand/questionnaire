'use strict';
// Создание (при его отсутствии) каталога /temp для спрайтов, favicons и т. п.

const { task, src, dest } = require(`gulp`);
const { temp } = require(`../../package.json`);

task(`temp`, () => src(`package.json`, { read: false }).pipe(dest(temp)));
