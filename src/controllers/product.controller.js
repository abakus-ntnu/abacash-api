/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /products              ->  active
 * GET     /products/all          ->  index
 * POST    /products              ->  create
 * GET     /products/:id          ->  show
 * PUT     /products/:id          ->  update
 * DELETE  /products/:id          ->  destroy
 */

'use strict';
import _ from 'lodash';
import errors from '../../components/errors';
import mongoose from 'mongoose';

// Get list of all products
exports.index = function(req, res, next) {
  req.connection.model('Product').find()
    .then(res.json.bind(res))
    .catch(next);
};

// Get list of active products
exports.active = function(req, res, next) {
  req.connection.model('Product').find({
    active: true
  }).then(res.json.bind(res))
    .catch(next);
};

// Get a single product
exports.show = function(req, res, next) {
  req.connection.model('Product').findById(req.params.id)
    .then(product => {
      if (!product) {
        throw new errors.NotFoundError('product');
      }
      return res.json(product);
    })
    .catch(mongoose.Error.CastError, () => {
        throw new errors.NotFoundError('product');
    })
    .catch(next);
};

// Get a single product by type
exports.type = function(req, res, next) {
  req.connection.model('Product').find({
    type: req.params.type
  }).then(res.json.bind(res))
    .catch(next);
};

// Creates a new product in the DB.
exports.create = function(req, res, next) {
  req.connection.model('Product').create(req.body)
    .then(res.status(201).json.bind(res))
    .catch(next);
};

// Updates an existing product in the DB.
exports.update = function(req, res, next) {
  delete req.body._id;
  req.connection.model('Product').findById(req.params.id)
    .then(product => {
      if (!product) {
        throw new errors.NotFoundError('product');
      }
      var updatedProduct = _.merge(product, req.body);
      return updatedProduct.save()
       
    })
    .then(res.json.bind(res))
    .catch(mongoose.Error.CastError, () => {
        throw new errors.NotFoundError('product');
    })
    .catch(next);
};

// Deletes a product from the DB.
exports.destroy = function(req, res) {
  req.connection.model('Product').findById(req.params.id)
    .then(product => {
      if (!product) {
        throw new errors.NotFoundError('product');
      }
      return product.remove();
    })
    .then(() => res.status(204).json())
    .catch(next);
};
