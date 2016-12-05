/* jshint node:true */

'use strict';

var accessTokenController = require('../controllers/access-token.js');

module.exports = {
  index: [index]
};

function index(req, res, next) {
  if (req.cookies.token) {
    accessTokenController.getAndIncrementVisit(req.cookies.token, function (err, accessToken) {
      if (err) {
        return next(err);
      }

      return accessToken ?
        handleAccessToken(err, accessToken) :
        accessTokenController.generate(handleAccessToken);
    });
  }
  else {
    accessTokenController.generate(handleAccessToken);
  }

  function handleAccessToken(err, accessToken) {
      if (err) {
        return next(err);
      }
      res.cookie('token', accessToken.token);
      res.render('index', {
        title: 'Burger Porn',
      });
    }
}