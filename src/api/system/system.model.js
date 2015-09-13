'use strict';

var mongoose = require('mongoose');
var errors = require('../../components/errors');
var Schema = mongoose.Schema;

var SystemSchema = new Schema({
    displayName: String,
    name: String,
    info: String,
    status: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        lowercase: true
    },
    productTypes: [String],
    roles: [{
        type: Schema.Types.ObjectId,
        ref: 'Role'
    }],
    needSeller: {
        type: Boolean, default: true
    },
    internalSales: {
        type: Boolean, default: false
    },
    allowCredit: {
        type: Boolean, default: false
    }
});

SystemSchema.statics.retrieveById = function(id) {
    return this.findById(id)
        .then(function(system) {
            if (!system) throw new errors.NotFoundError('system');
            return system;
        })
        .catch(mongoose.Error.CastError, function(err) {
            throw new errors.NotFoundError('system');
        });
};

SystemSchema.methods.addRole = function(role) {
    this.roles.push(role);
    return role.save().bind(this)
        .then(function(savedRole) {
            return this.save().return(savedRole);
        });
};

module.exports = mongoose.model('System', SystemSchema);
