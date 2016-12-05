/* jshint node:true */

'use strict';

var mongoose = require('mongoose');
var AccessToken = mongoose.model('AccessToken');
var crypto = require('crypto');

module.exports = {
  generate: generate,
  getAndIncrementVisit: getAndIncrementVisit
};

function generate(next) {
  var token = crypto.randomBytes(20).toString('hex');
  var accessToken = new AccessToken({
    token: token,
    visits: 1
  });
  accessToken.save(next);
  
  return token;
}

function getAndIncrementVisit(token, next) {
  AccessToken.findOneAndUpdate(
    {token: token},
    {'$inc': {visits: 1}},
    next
  );
}