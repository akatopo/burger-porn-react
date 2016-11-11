const dev = require('mozilla-neo/config/webpack.dev');
const { join } = require('path');

// TODO extend all webpack confs
// TODO use object merging/extending

const extendedDev = Object.assign({}, dev, {
  // target: 'node',
  node: {
    __dirname: true,
    __filename: false,
  },
});

extendedDev.eslint.configFile = join(__dirname, '.eslintrc.js');
extendedDev.module.loaders.push({
  test: /\.handlebars$/, loader: 'handlebars-loader',
});

module.exports = extendedDev;
