/* jshint node:true */

'use strict';

var accessTokenController = require('../controllers/access-token.js');

module.exports = {
  token: [token]
};

function token(req, res, next) {
  accessTokenController.generate(handleAccessToken);

  function handleAccessToken(err, accessToken) {
      if (err) {
        return next(err);
      }
      res.send({
        token: accessToken.token
      })
    }
}