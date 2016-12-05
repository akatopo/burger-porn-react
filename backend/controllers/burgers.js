/* jshint node:true */

'use strict';

var mongoose = require('mongoose');
var Burger = mongoose.model('Burger');
var config  = require('../config/config');

module.exports = {
  getAll: getAll,
  get: get,
  getRandom: getRandom
};

function get(req, res, next) {
  if (req.params.id) {
    Burger.findById(req.params.id, createRes.bind(null, res, next));
  }
}

function getRandom(req, res, next) {
  Burger.random(createRes.bind(null, res, next));
}

function getAll(req, res, next) {
  Burger.find(function (err, burgers) {
    if (err) {
      return next(err);
    }
    var processedBurgers = burgers.map(processBurger);
    res.send({
      burgers: processedBurgers
    });
  });
}

function createRes(res, next, err, burger) {
  console.log(burger.createdAt);
  if (err) {
    return next(err);
  }
  burger = processBurger(burger);
  res.send({
    burgers: [burger]
  });
}

function processBurger(burger) {
  burger = burger.toObject({ virtuals: true });
  delete burger.love;
  burger.pictures = burger.pictures
    .map(function (picture) {
      var pictureCopy = Object.assign({}, picture);
      pictureCopy.url = config.host + pictureCopy.url;

      return pictureCopy;
    });

  return burger;
}
