const webpack = require('webpack');
// const dev = require('mozilla-neo/config/webpack.dev');
const merge = require('deepmerge');
const path = require('path');
const fs = require('fs');

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter((x) => ['.bin'].indexOf(x) === -1)
  .forEach((mod) => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

module.exports = merge({}, {
  entry: ['./backend/app.js'],
  target: 'node',
  output: {
    path: path.join(__dirname, 'backend'),
    filename: 'app.bundle.js',
  },
  externals: nodeModules,
  plugins: [
    new webpack.IgnorePlugin(/\.(jpg|webp|handlebars)$/),
    new webpack.BannerPlugin(
      'require("source-map-support").install();',
      { raw: true, entryOnly: false }
    ),
  ],
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: true,
    __dirname: true,
    setImmediate: false,
  },
  devtool: 'sourcemap',
});
