/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /products              ->  index
 * GET     /products/all          ->  indexAll
 * POST    /products              ->  create
 * GET     /products/:id          ->  show
 * PUT     /products/:id          ->  update
 * DELETE  /products/:id          ->  destroy
 */

'use strict';
var _ = require('lodash');

// Get list of all products
exports.index = function(req, res) {
  req.connection.model('Product').find(function (err, products) {
    if(err) { return handleError(res, err); }
    return res.json(200, products);
  });
};

// Get list of active products
exports.active = function(req, res) {
  req.connection.model('Product').find(function (err, products) {
    if(err) { return handleError(res, err); }
    return res.json(200, products);
  });
};

// Get list of all products
exports.indexAll = function(req, res) {
  req.connection.model('Product').find(function (err, products) {
    if(err) { return handleError(res, err); }
    return res.json(200, products);
  });
};

// Get a single product
exports.show = function(req, res) {
  req.connection.model('Product').findById(req.params.id, function (err, product) {
    if(err) { return handleError(res, err); }
    if(!product) { return res.send(404); }
    return res.json(product);
  });
};

// Get a single product
exports.type = function(req, res) {
  req.connection.model('Product').find({type: req.params.type}, function (err, products) {
    if(err) { return handleError(res, err); }
    if(!products) { return res.send(404); }
    return res.json(products);
  });
};

// Creates a new product in the DB.
exports.create = function(req, res) {
  req.connection.model('Product').create(req.body, function(err, product) {
    if(err) { return handleError(res, err); }
    return res.json(201, product);
  });
};

// Updates an existing product in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  req.connection.model('Product').findById(req.params.id, function (err, product) {
    if (err) { return handleError(res, err); }
    if(!product) { return res.send(404); }
    var updated = _.merge(product, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, product);
    });
  });
};

// Deletes a product from the DB.
exports.destroy = function(req, res) {
  req.connection.model('Product').findById(req.params.id, function (err, product) {
    if(err) { return handleError(res, err); }
    if(!product) { return res.send(404); }
    req.connection.model('Product').remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
