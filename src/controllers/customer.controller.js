import db from '../models';
import { NotFoundError, ModelValidationError } from '../components/errors';
import Sequelize from 'sequelize';
import _ from 'lodash';

export function list(req, res, next) {
    req.system.getCustomers({ include: [db.CustomerRole] })
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
            [lookupParam]: req.params.lookup,
            systemId: req.system.id
        },
        include: [db.CustomerRole]
    })
    .then(customer => {
        if (!customer) throw new NotFoundError();
        res.json(customer);
    })
    .catch(next);
}

export function create(req, res, next) {
    db.Customer.create({
        ...req.body,
        systemId: req.system.id
    })
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
            id: req.params.customerId,
            systemId: req.system.id
        },
        returning: true,
        fields: _.without(Object.keys(req.body), 'id')
    })
    .spread((count, customer) => {
        if (!count) throw new NotFoundError();
        res.json(customer[0]);
    })
    .catch(next);
}

export function destroy(req, res, next) {
    db.Customer.destroy({ where: {
        id: req.params.customerId,
        systemId: req.system.id
    } })
    .then(count => {
        if (!count) throw new NotFoundError();
        res.status(204).send();
    })
    .catch(next);
}
