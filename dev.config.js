const dev = require('mozilla-neo/config/webpack.dev');
const merge = require('deepmerge');
const { join } = require('path');

// TODO extend all webpack confs

const extendedDev = merge(dev, {
  node: {
    __dirname: true,
    __filename: false,
  },
  eslint: {
    configFile: join(__dirname, '.eslintrc.js'),
  },
  module: {
    loaders: [
      { test: /\.handlebars$/, loader: 'handlebars-loader' },
    ],
  },
  devtool: '#eval-source-map',
});

module.exports = extendedDev;
