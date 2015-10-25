import db from '../models';
import { NotFoundError, ValidationError } from '../components/errors';
import Sequelize from 'sequelize';

export function list(req, res, next) {
    req.system.getCustomers()
    .then(res.json.bind(res))
    .catch(next);
}

export function retrieve(req, res, next) {
    db.Customer.findOne({ where: {
        id: req.params.customerId,
        systemId: req.system.id
    }})
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
        throw new ValidationError(err);
    })
    .catch(next);
}


export function update(req, res, next) {
    db.Customer.update({
        ...req.body,
        id: req.params.customerId,
        systemId: req.system.id
    })
    .then(customer => {
        res.status(201).json(customer);
    })
    .catch(Sequelize.ValidationError, err => {
        throw new ValidationError(err);
    })
    .catch(next);
}

/*

// Deletes a customer from the DB.
exports.destroy = function(req, res, next) {
    req.connection.model('Customer').findById(req.params.id)
        .then(customer => {
            if (!customer) {
                throw new errors.NotFoundError('customer');
            }
            return customer.remove();
        })
        .then(() => res.status(204).json())
        .catch(next);
};
*/
