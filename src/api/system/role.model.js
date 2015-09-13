'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoleSchema = new Schema({
    role: String,
    internalSales: Boolean,
    isSeller: Boolean
});

module.exports = mongoose.model('Role', RoleSchema);
