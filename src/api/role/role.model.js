'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoleSchema = new Schema({
    role: String,
    internalSales: Boolean,
    isSeller: Boolean
});

mongoose.model('Role', RoleSchema);
module.exports = function(connection) {
	return connection.model('Role', RoleSchema);
};
