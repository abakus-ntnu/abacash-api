import db from '../models';
import { NotFoundError, ModelValidationError, ValidationError} from '../components/errors';
import Sequelize from 'sequelize';
import Bluebird from 'bluebird';

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

    let _transaction;
    let _customer;
    let _total;
    let _isInternal;

    db.Customer.findById(req.body.customerId)
    .then((customer) => {
        _customer = customer;
        return customer.getCustomerRole();
    })
    .then((customerRole) => {
        _isInternal = customerRole.internalSales; 
        // reduce stock
        return Bluebird.mapSeries(req.body.products, id => {
            return db.Product.findById(id)
            .then(product => {
                product.stock--;
                return product.save();
            });
        })
    })
    .reduce((sum, product) => (_isInternal ? product.internalPrice : product.price) + sum, 0)
    .then(total => {
        _total = total;
        return db.Transaction.create({
            ...req.body,
            systemId: req.system.id,
            total
        });
    })
    .then(transaction => {
        _transaction = transaction;
        _customer.balance -= _total;
        if (_customer.balance < 0) {
            throw new ValidationError('Insufficient balance');
        }
        return _customer.save();
    })
    .then(() => {
        res.status(201).json(_transaction);
    })
    .catch(Sequelize.ValidationError, err => {
        throw new ModelValidationError(err);
    })
    .catch(next);
}
