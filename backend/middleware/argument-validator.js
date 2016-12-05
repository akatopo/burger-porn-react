/* jshint node:true */

'use strict';

var _ = require('underscore'),
  validator = require('validator'),
  ResHandler = require('./response-handler');

module.exports = {
  validate: validate,
  tmpls:    templates()
};

function validate(opts) {
  return function(req, res, next) {
    var params = {};
    var getParam = _.partial(getReqParam, req);
    var isArgsValid = _.every(opts, function(validatorName, key) {
      var val = getParam(key);
      return validatorHandle(validatorName, key, val, params);
    });
    if(isArgsValid) {
      req.params = params;
      return next();
    }else {
      return ResHandler.fail(res, 'INVALID_ARGUMENTS');
    }
  };
}

var validatorHandle = (function(){
  function v_mongoId(key, val, params) {
    params[key] = val;
    return true;
  }
  function v_accessToken(key, val, params) {
    params[key] = val;
    return true;
  }
  var validatorHandlers = {
    mongoId:      v_mongoId,
    accessToken:  v_accessToken
  }
  return function(validatorName, key, val, params) {
    return validatorHandlers[validatorName](key, val, params);
  }
})();

function getReqParam(req, key) {
  return req.params[ key ] || req.body[ key ] || req.query[ key ];
}

function templates() {
  return {
    accessToken_id: validate({
      accessToken: 'accessToken', 
      id: 'mongoId'
    })
  };
}

