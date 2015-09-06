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
var Systems = require('./system.model');
var connection = require('../../components/connection.factory.js');

// Get list of systems
exports.index = function(req, res) {
  Systems.find(function (err, systems) {
    if(err) { return handleError(res, err); }
    return res.json(200, systems);
  });
};

// Get a single system
exports.show = function(req, res) {
  Systems.findById(req.params.id).lean().exec( function (err, system) {
    if(err) { return handleError(res, err); }
    if(!system) { return res.send(404); }
    return res.json(system);
  });
};

// Creates a new system in the DB.
exports.create = function(req, res) {
  Systems.create(req.body, function(err, system) {
    if(err) { return handleError(res, err); }
    connection.createSystem(system);
    return res.json(201, system);
  });
};

// The webapplication selects which system to work agianst
exports.use = function(req, res) {
  Systems.findById(req.params.id, function (err, system) {
    if(err) { return handleError(res, err); }
    if(!system) { return res.send(404); }
    res.cookie('system', system._id.toString());
    return res.json(200, system);
  });
};

// Updates an existing system in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Systems.findById(req.params.id, function (err, system) {
    if (err) { return handleError(res, err); }
    if(!system) { return res.send(404); }
    var updated = _.merge(system, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, system);
    });
  });
};

// Deletes a system from the DB.
exports.destroy = function(req, res) {
  Systems.findById(req.params.id, function (err, system) {
    if(err) { return handleError(res, err); }
    if(!system) { return res.send(404); }
    Systems.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

exports.connect = function(req, res){
  return res.send(200)
}

exports.createRole = function(req, res){
  return res.send(200)
}
exports.createType = function(req, res){
  return res.send(200)
}
exports.updateRole = function(req, res){
  return res.send(200)
}
exports.updateType = function(req, res){
  return res.send(200)
}
exports.deleteRole = function(req, res){
  return res.send(200)
}
exports.deleteType = function(req, res){
  return res.send(200)
}
function handleError(res, err) {
  return res.send(500, err);
}