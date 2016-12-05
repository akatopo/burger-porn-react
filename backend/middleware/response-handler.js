/* jshint node:true */

'use strict';

module.exports = {
  success:  success,
  fail:     fail,
  handle:   handle,
  errCodes: errCodes()
};

var HTTP_CODE_SUCCESS   = 200;
var HTTP_CODE_ERROR     = 400;

function success(res, data) {
  send(res, HTTP_CODE_SUCCESS, data);
}

function fail(res, errCode, descr) {
  send(res, HTTP_CODE_ERROR, {
    code:   errCode,
    descr:  descr
  });
}

function handle(res, errCode, data) {
  errCode ? fail(res, errCode) : success(res, data);
}

function send(res, httpCode, data) {
  res.status(httpCode).json(data);
}

function errCodes() {
  return {
    DB_QUERY:           1200,

    INVALID_ARGUMENTS:  1300,

    BURGER_NOT_FOUND:   1400
  };
}