/* jshint node:true */

var burgersCtrl = require('../controllers/burgers');

module.exports = {
  getAll: [burgersCtrl.getAll],
  getRandom: [burgersCtrl.getRandom],
  get: [burgersCtrl.get]
};