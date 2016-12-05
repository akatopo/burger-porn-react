/* jshint node:true */

'use strict';

// Burger model

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BurgerSchema = new Schema({
  name: String,
  desc: String,
  love: [String],
  loc: {
    'latLong': { type: [Number], index: '2d' },
    'name': String,
    'address': String,
    'placeId': String
  },
  ingredients: [String],
  pictures: [
    {'width': Number, 'height': Number, 'url': String }
  ]
});

BurgerSchema.statics.random = function(next) {
  var self = this;

  self.count(function(err, count) {
    if (err) {
      return next(err);
    }
    var rand = Math.floor(Math.random() * count);
    self.findOne().skip(rand).exec(next);
  });
};

BurgerSchema.virtual('createdAt')
  .get(function(){
    return this._id.getTimestamp();
  });

BurgerSchema.virtual('totalLove')
  .get(function(){
    return this.love.length;
  });

BurgerSchema.statics.makeLove = function(id, accessToken, next) {
  var opt = { '$addToSet': { love: accessToken } };
  this.findByIdAndUpdate(id, opt, next);
};

BurgerSchema.statics.makeDivorce = function(id, accessToken, next) {
  var opt = { '$pull': { love: accessToken } };
  this.findByIdAndUpdate(id, opt, next);
};

BurgerSchema.statics.didILoveYou = function(id, accessToken, next) {
  var q = { 
    '$and': [ { 
        _id: new mongoose.Types.ObjectId( id ) 
      }, { 
        love: accessToken 
      } ]
  };
  this.find( q, next );
};

  
mongoose.model('Burger', BurgerSchema);

