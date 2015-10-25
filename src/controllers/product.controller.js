import Sequelize from 'sequelize';
import db from '../models';
import { NotFoundError, ValidationError } from '../components/errors';

export function listAll(req, res, next) {
  req.system.getProducts()
      .then(res.json.bind(res))
      .catch(next);
};

export function list(req, res, next) {
    req.system.getProducts({
        where: {
            active: true
        }
    })
    .then(res.json.bind(res))
    .catch(next);
};

export function get(req, res, next) {
    db.Product.findOne({
        where: {
            systemId: req.system.id,
            id: req.params.id
        }
    })
    .then(product => {
        if (!product) {
            throw new NotFoundError();
        }
        res.json(product);
    })
    .catch(next);

};

export function create(req, res, next) {
    db.Product.create({
        ...req.body,
        systemId: req.system.id
    })
    .then(product => {
        res.status(201).json(product);
    })
    .catch(Sequelize.ValidationError, err => {
        throw new ValidationError(err);
    })
    .catch(next);
};

export function destroy(req, res, next) {
    db.Product.destroy({
        where: {
            systemId: req.system.id,
            id: req.params.id
        }
    })
    .then(count => {
        if (count == 0) {
            throw new NotFoundError();
        }
        res.status(204).send();
    })
    .catch(next);
};


/*
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
*/
