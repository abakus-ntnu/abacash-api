'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TransactionSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = function(connection) {  
	return connection.model('Transaction', TransactionSchema);
};