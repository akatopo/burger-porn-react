const prod = require('mozilla-neo/config/webpack.prod');
const merge = require('deepmerge');

const extendedProd = merge(prod, {
  node: {
    __dirname: true,
    __filename: false,
  },
  module: {
    loaders: [
      { test: /\.handlebars$/, loader: 'handlebars-loader' },
    ],
  },
});

module.exports = extendedProd;
