/* jshint node:true */

var loveCtrl = require('../controllers/love');
var argValidator = require('../middleware/argument-validator');

module.exports = {
  love: [
    argValidator.tmpls.accessToken_id,
    loveCtrl.love
  ],
  unLove: [
    argValidator.tmpls.accessToken_id,
    loveCtrl.unLove
  ],
  queryLove: [
    argValidator.tmpls.accessToken_id,
    loveCtrl.queryLove
  ]
};