'use strict';

const DefinePlugin = require('webpack').DefinePlugin;
const exists = require('exists-file').sync;
const HtmlPlugin = require('html-webpack-plugin');
const path = require('path');
const qs = require('qs');
const webpackPostcssTools = require('webpack-postcss-tools');
const postCssCustomMedia = require('postcss-custom-media');

const CWD = process.cwd();
const BUILD = path.join(CWD, 'build');
const NODE_MODULES = path.join(CWD, 'node_modules');
const PACKAGE = require(path.join(CWD, 'package.json'));
const SRC_FILE = path.join(CWD, PACKAGE.config.entry);
const SRC = path.dirname(SRC_FILE);
const TESTS = path.join(CWD, 'tests');
const USER_TEMPLATE = path.join(SRC, 'template.handlebars');
const ENV = Object
  .keys(process.env)
  .reduce((env, key) => {
    env[`process.env.${key}`] = JSON.stringify(process.env[key]);
    return env;
  }, {});

const loader = (name) => `${name}?${qs.stringify(require(`.\/${name}`), {
  encode: false,
  arrayFormat: 'brackets'
})}`;

const map = webpackPostcssTools.makeVarMap('src/scss/suit.css');

module.exports = {
  node: {
    __dirname: true,
    __filename: false,
  },
  entry: ['babel-polyfill', SRC_FILE],
  output: {
    path: BUILD,
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new DefinePlugin(ENV),
    new HtmlPlugin(Object.assign(
      (exists(USER_TEMPLATE) ? { template: USER_TEMPLATE } : {}),
      { hash: true, xhtml: true},
      (PACKAGE.config.html || {})
    ))
  ],
  resolve: {
    root: [SRC, NODE_MODULES],
    extensions: ['', '.js', '.jsx', '.json']
  },
  resolveLoader: {
    root: [NODE_MODULES]
  },
  eslint: {
    configFile: path.join(__dirname, '.eslintrc.js'),
    useEslintrc: false
  },
  postcss: [
    webpackPostcssTools.prependTildesToImports,
    postCssCustomMedia({
      extensions: map.media,
    }),
  ],
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        include: [SRC],
        loader: 'eslint'
      }
    ],
    loaders: [
      {
        test: /\.html$/,
        loader: 'file',
        query: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.handlebars$/,
        loader: 'handlebars-loader'
      },
      {
        test: /\.(css|scss)$/,
        loaders: ['style', 'css?importLoaders=1', 'postcss', 'sass']
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.jsx?$/,
        include: [SRC, TESTS],
        exclude: /(node_modules|bower_components)/,
        loaders: ['react-hot', loader('babel')]
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          mimetype: 'application/font-woff'
        }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url',
        query: {
          limit: '10000',
          mimetype: 'application/octet-stream'
        }
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'svg-url',
        query: {
          limit: '10000',
          mimetype: 'application/svg+xml'
        }
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url',
        query: {
          limit: 8192
        }
      },
      {
        test: /\.ico(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url'
      }
    ]
  }
};
