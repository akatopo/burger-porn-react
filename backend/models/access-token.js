/* jshint node:true */

'use strict';

// Access token model

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccessTokenSchema = new Schema({
  token: String,
  visits: Number
});

AccessTokenSchema.virtual('createdAt')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('AccessToken', AccessTokenSchema);

