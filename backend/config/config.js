/* jshint node:true */

var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';
    host = process.env.BASE_API_URL || 'http://localhost:3000'

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'burger-porn'
    },
    port: 3000,
    db: 'mongodb://localhost/burger-porn-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'burger-porn'
    },
    port: 3000,
    db: 'mongodb://localhost/burger-porn-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'burger-porn'
    },
    port: process.env.PORT || 3000,
    db: process.env.MONGODB_URI
  }
};

module.exports = Object.assign({}, config[env], { host: host });
