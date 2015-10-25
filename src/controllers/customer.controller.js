import db from '../models';

// Get list of customers
export function index(req, res, next) {
    req.system.getCustomers()
        .then(res.json.bind(res))
        .catch(next);
}

/*
exports.role = function(req, res, next) {
    req.connection.model('Customer').find({'role.id': req.params.id})
        .then(res.json.bind(res))
        .catch(next);
};

// Get a single customer
exports.show = function(req, res, next) {
    req.connection.model('Customer').findById(req.params.id)
        .then(customer => {
            if (!customer) {
                throw new errors.NotFoundError('customer');
            }
            return res.json(customer);
        })
        .catch(mongoose.Error.CastError, () => {
                throw new errors.NotFoundError('customer');
        })
        .catch(next);
};

// Creates a new customer in the DB.
exports.create = function(req, res, next) {
    req.connection.model('Customer').create(req.body)
        .then(res.status(201).json.bind(res))
        .catch(next);
};

// Updates an existing customer in the DB.
exports.update = function(req, res, next) {
    delete req.body._id;
    req.connection.model('Customer').findById(req.params.id)
        .then(customer => {
            if (!customer) {
                throw new errors.NotFoundError('customer');
            }
            var updatedCustomer = _.merge(customer, req.body);
            return updatedCustomer.save()

        })
        .then(res.json.bind(res))
        .catch(mongoose.Error.CastError, () => {
                throw new errors.NotFoundError('customer');
        })
        .catch(next);
};

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
