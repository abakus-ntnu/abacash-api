import db from '../models';
import { NotFoundError, ModelValidationError, ValidationError} from '../components/errors';
import Sequelize from 'sequelize';

export function list(req, res, next) {
    req.system.getTransactions()
    .then(res.json.bind(res))
    .catch(next);
}

export function retrieve(req, res, next) {
    db.Transaction.findOne({ where: {
        id: req.params.transactionId,
        systemId: req.system.id
    }})
    .then(transaction => {
        if (!transaction) throw new NotFoundError();
        res.json(transaction);
    })
    .catch(next);
    
}

export function add(req, res, next) {
    if (!req.body.products || req.body.products.length === 0) {
        const error =  new ValidationError('A transaction must contain at least one product');
        return next(error);
    }
    db.Transaction.create({
        ...req.body,
        systemId: req.system.id
    })
    .then(transaction => {
        res.status(201).json(transaction);
    })
    .catch(Sequelize.ValidationError, err => {
        throw new ModelValidationError(err);
    })
    .catch(next);
}
