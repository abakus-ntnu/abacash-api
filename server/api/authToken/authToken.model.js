'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AuthToken = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('AuthToken', AuthToken);