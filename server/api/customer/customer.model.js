'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CustomerSchema = new Schema({
  role: {
    role: String,
    hasInternalPrice: Boolean,
    isSeller: Boolean
  },
  rfid: {type: String, required: true},
  displayname: {type: String, required: true},
  username: {type: String},
  balance: {type: Number, default: 0}
});

module.exports = function(connection) {  
	return connection.model('Customer', CustomerSchema);
};