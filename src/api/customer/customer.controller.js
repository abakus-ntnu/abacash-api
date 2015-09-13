/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /customers              ->  index
 * POST    /customers              ->  create
 * GET     /customers/:id          ->  show
 * PUT     /customers/:id          ->  update
 * DELETE  /customers/:id          ->  destroy
 */

'use strict';
var _ = require('lodash');

// Get list of customers
exports.index = function(req, res, next) {
  req.connection.model('Customer').find()
    .then(res.json.bind(res))
    .catch(next);
};


exports.role = function(req, res) {
  req.connection.model('Customer').find({'role.id': req.params.id}, function (err, customers) {
    if(err) { return handleError(res, err); }
    if(!customers) { return res.send(404); }
    return res.json(customers);
  });
};

// Get a single customer
exports.show = function(req, res) {
  req.connection.model('Customer').findById(req.params.id, function (err, customer) {
    if(err) { return handleError(res, err); }
    if(!customer) { return res.send(404); }
    return res.json(customer);
  });
};

// Creates a new customer in the DB.
exports.create = function(req, res) {
  req.connection.model('Customer').create(req.body, function(err, customer) {
    if(err) { return handleError(res, err); }
    return res.json(201, customer);
  });
};

// Updates an existing customer in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  req.connection.model('Customer').findById(req.params.id, function (err, customer) {
    if (err) { return handleError(res, err); }
    if(!customer) { return res.send(404); }
    var updated = _.merge(customer, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, customer);
    });
  });
};

// Deletes a customer from the DB.
exports.destroy = function(req, res) {
  req.connection.model('Customer').findById(req.params.id, function (err, customer) {
    if(err) { return handleError(res, err); }
    if(!customer) { return res.send(404); }
    req.connection.model('Customer').remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}