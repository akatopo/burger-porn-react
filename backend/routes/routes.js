/* jshint node:true */

'use strict';

var router = require('express').Router();
var burgers = require('./burgers');
// var index = require('./index').index;
var love = require('./love');
var token = require('./token');

// Frontend

// router.get('/', index);
// router.get('/burgers/:id', index);

// API

// burgers

router.get('/api/v1/burgers', burgers.getAll);
router.get('/api/v1/burgers/hungry', burgers.getRandom);
router.get('/api/v1/burgers/:id', burgers.get);

// love

router.get('/api/v1/love/:id', love.queryLove);
router.post('/api/v1/love/:id', love.love);
router.post('/api/v1/unLove/:id', love.unLove);

// token

router.get('/api/v1/token', token.token);

module.exports = router;
