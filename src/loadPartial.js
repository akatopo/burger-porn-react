import fs from 'fs';
import path from 'path';

export default (tpl) => fs.readFileSync(
  path.join(__dirname, 'partials', `${tpl}.handlebars`)
);
