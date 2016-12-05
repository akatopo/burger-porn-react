/* jshint node:true */

'use strict';

var _ = require('underscore'),
  mongoose = require('mongoose'),
  Burger = mongoose.model('Burger'),
  ResHandler = require('../middleware/response-handler');

module.exports = {
  love: love,
  unLove: unLove,
  queryLove: queryLove
};

function love(req, res, next) {
  var params = req.params;
  Burger.makeLove(params.id, params.accessToken, _.partial(loveResp, res));
}

function unLove(req, res, next) {
  var params = req.params;
  Burger.makeDivorce(params.id, params.accessToken, _.partial(loveResp, res));
}

function queryLove(req, res, next) {
  var params = req.params;
  Burger.didILoveYou(params.id, params.accessToken, _.partial(queryLoveResp, res));
}

function loveResp(res, err, burger) {
  if(err) {
    return ResHandler.fail(res, ResHandler.errCodes.DB_QUERY);
  }
  if(burger) {
    return ResHandler.success(res, {
      id: burger.id,
      totalLove: burger.love.length
    });
  }else {
    return ResHandler.fail(res, ResHandler.errCodes.BURGER_NOT_FOUND);
  }
}

function queryLoveResp(res, err, burger) {
  if(err) {
    return ResHandler.fail(res, ResHandler.errCodes.DB_QUERY);
  }

  if(_.isArray(burger)) {
    burger = burger.length > 0 ? burger[0]: undefined;
  }
  return ResHandler.success(res, {exists: !!burger});
}