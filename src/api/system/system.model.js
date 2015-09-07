'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SystemSchema = new Schema({
  displayName: String,
  name: String,
  info: String,
  status: { type: Boolean, default: false },
  email: { type: String, lowercase: true },
  productTypes: [String],
  customerRoles: 
  [{
    id: String,
    role: String,
    internalSales: Boolean,
    isSeller: Boolean
  }],
  needSeller: { type: Boolean, default: true },
  internalSales: { type: Boolean, default: false },
  allowCredit: { type: Boolean, default: false }
});

module.exports = mongoose.model('System', SystemSchema);