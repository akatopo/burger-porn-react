/* jshint node:true */
'use strict';

var express = require('express');
// var glob = require('glob');

// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var exphbs  = require('express-handlebars');
var acceptWebp = require('accept-webp');
var cors = require('cors');
var herokuSslRedirect = require('heroku-ssl-redirect');;
var routes = require('../routes/routes');

module.exports = function(app, config) {
  app.engine('handlebars', exphbs({
    layoutsDir: config.root + 'views/layouts/',
    defaultLayout: 'main',
    partialsDir: [config.root + 'views/partials/']
  }));
  app.set('views', config.root + 'views');
  app.set('view engine', 'handlebars');

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(cors());
  app.use(herokuSslRedirect());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(acceptWebp(config.root + '/public', ['jpg']));
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());

  app.use('/', routes);

  // var controllers = glob.sync(config.root + 'controllers/*.js');
  // controllers.forEach(function (controller) {
  //   require(controller)(app);
  // });

  app.all('/burgers/*', function(req, res) {
    res.sendFile(config.root + '/public/index.html');
  });

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if(app.get('env') === 'development'){
    app.use(function (err, req, res/*, next*/) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res/*, next*/) {
    res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
      });
  });

};
