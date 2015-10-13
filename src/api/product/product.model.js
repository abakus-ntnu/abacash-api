'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductSchema = new Schema({
  type: String,
  price: {type: Number, default: 0},
  internalprice: {type: Number, default: 0},
  name: {type: String, required: true},
  active: {type: Boolean, default: false},
  stock: {type: Number, default: 0}
});

module.exports = function(connection) {  
	return connection.model('Product', ProductSchema);
};
