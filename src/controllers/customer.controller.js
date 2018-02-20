import Bluebird from 'bluebird';
import db from '../models';
import { NotFoundError, ModelValidationError } from '../components/errors';
import Sequelize from 'sequelize';
import _ from 'lodash';
import config from '../config';

export function list(req, res, next) {
  db.CustomerRole.findAll({ include: [db.CustomerRole] })
    .then(res.json.bind(res))
    .catch(next);
}

export function retrieve(req, res, next) {
  let { lookupParam } = req.query;

  if (['rfid', 'id', 'username'].indexOf(lookupParam) === -1) {
    lookupParam = 'id';
  }

  db.Customer.findOne({
    where: {
      [lookupParam]: req.params.lookup
    },
    include: [db.CustomerRole]
  })
    .then(customer => {
      if (!customer) throw new NotFoundError();
      res.json(customer);
    })
    .catch(next);
}

function populateCustomerRole(customer) {
  const plain = customer.get({ plain: true });
  if (!plain.customerRoleId) return Bluebird.resolve(plain);
  return db.CustomerRole.findById(plain.customerRoleId).then(customerRole => ({
    ...plain,
    customerRole
  }));
}

export function create(req, res, next) {
  db.Customer.create({
    ...req.body,
    customerRoleId: config.defaultCustomerRoleId // todo
  })
    .then(populateCustomerRole)
    .then(customer => {
      res.status(201).json(customer);
    })
    .catch(Sequelize.ValidationError, err => {
      throw new ModelValidationError(err);
    })
    .catch(next);
}

export function update(req, res, next) {
  db.Customer.update(req.body, {
    where: {
      id: req.params.customerId
    },
    returning: true,
    fields: _.without(Object.keys(req.body), 'id')
  })
    .spread((count, customer) => {
      if (!count) throw new NotFoundError();
      return populateCustomerRole(customer[0]);
    })
    .then(customer => {
      res.json(customer);
    })
    .catch(next);
}

export function destroy(req, res, next) {
  db.Customer.destroy({
    where: {
      id: req.params.customerId
    }
  })
    .then(count => {
      if (!count) throw new NotFoundError();
      res.status(204).send();
    })
    .catch(next);
}
