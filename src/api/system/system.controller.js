/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /systems              ->  index
 * POST    /systems              ->  create
 * GET     /systems/:id          ->  show
 * PUT     /systems/:id          ->  update
 * DELETE  /systems/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var Bluebird = require('bluebird');
var System = require('./system.model');
var errors = require('../../components/errors');
var connection = require('../../components/connection.factory.js');

// Get list of systems
exports.index = function(req, res, next) {
  System.find()
    .then(res.json.bind(res))
    .catch(next);
};


// Get a single system
exports.show = function(req, res, next) {
    const Role = req.connection.model('Role');
    let _system;

    System.retrieveById(req.params.system)
        .then(system => {
            _system = system.toObject();
            return Bluebird.map(_system.roles, id => Role.findById(id));
        })
        .then(roles => {
            _system.roles = roles;
            return res.json(_system);
        })
        .catch(next);
};

exports.create = function(req, res, next) {
    System.create(req.body)
        .then(system => {
            connection.createSystem(system);
            res.status(201).json(system);
        })
        .catch(mongoose.Error.ValidationError, err => {
            throw new errors.ValidationError(err.errors);
        })
        .catch(next);
};

// Updates an existing system in the DB.
exports.update = function(req, res, next) {
    System.retrieveById(req.params.system)
        .then(system => {
            var updated = _.merge(system, req.body);
            return updated.save();
        })
        .then(res.json.bind(res))
        .catch(next);
};

exports.createRole = function(req, res, next) {
    if (_.isEmpty(req.body)) return next(new errors.ValidationError());
    const Role = req.connection.model('Role');

    System.retrieveById(req.params.system)
        .then(system => {
            var role = new Role(req.body);
            return system.addRole(role);
        })
        .then(res.json.bind(res))
        .catch(next);
}
