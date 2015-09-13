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
var System = require('./system.model');
var Role = require('./role.model');
var errors = require('../../components/errors');
var connection = require('../../components/connection.factory.js');
var async = require('async');

// Get list of systems
exports.index = function(req, res, next) {
  System.find()
    .populate('roles')
    .then(res.json.bind(res))
    .catch(next);
};

// Get a single system
exports.show = function(req, res, next) {
    System.retrieveById(req.params.id)
        .then(res.json.bind(res))
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
    System.retrieveById(req.params.id)
        .then(system => {
            var updated = _.merge(system, req.body);
            return updated.save();
        })
        .then(res.json.bind(res))
        .catch(next);
};

// Deletes a system from the DB.
exports.destroy = function(req, res, next) {
    System.findByIdAndRemove(req.params.id)
        .exec()
        .then(() => {
            res.json({
                message: req.params.id + ' deleted'
            });
        })
        .catch(mongoose.Error.CastError, function(err) {
            throw new errors.NotFoundError('system');
        })
        .catch(next);
};


exports.createRole = function(req, res, next) {
    if (_.isEmpty(req.body)) return next(new errors.ValidationError());
    var system;

    System.retrieveById(req.params.id)
        .then(system => {
            var role = new Role(req.body);
            return system.addRole(role);
        })
        .then(res.json.bind(res))
        .catch(next);
}

exports.updateRole = function(req, res){
  var role = req.body;
  System.update({'customerRoles.id': role.id}, { $set: { 'customerRoles.$': role  } }, function(err, system) {
    if (err) { return handleError(res, err); }
    if(!system) { return res.send(404); }
    async.each(role.customers, function(customerRole, callback) {
      req.connection.model('Customer').findById(customerRole._id, function (err, customer) {
        if (err) { return handleError(res, err); }
        if(!customer) { return res.send(404); }
        customer.role = role;
        customer.save(function (err) {
          if (err) { return handleError(res, err); }
          callback();
        });
      });
    }, function(err){
      if (err) { return handleError(res, err); }
      return res.json(200, role);
    });

  });
}


exports.deleteRole = function(req, res){
  System.findOneAndUpdate({_id: req.params.id}, { $pull: { customerRoles: {  id: req.params.role } } }, function(err, system) {
    if (err) { return handleError(res, err); }
    if(!system) { return res.send(404); }
    return res.send(204);
  });
}


exports.connect = function(req, res){
  return res.send(200)
}

exports.updateType = function(req, res){
  return res.send(200)
}
exports.createType = function(req, res){
  return res.send(200)
}
exports.deleteType = function(req, res){
  return res.send(200)
}
