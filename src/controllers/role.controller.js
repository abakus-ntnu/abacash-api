import mongoose from 'mongoose';
import errors from '../../components/errors';

exports.update = function(req, res, next) {
    const { id } = req.params;
    const Role = req.connection.model('Role');

    Role.update({ _id: id }, req.body)
        .then((raw) => {
            if (!raw.n) throw new errors.NotFoundError('role');
            res.json({
                message: `${id} was updated`
            });
        })
        .catch(mongoose.Error.CastError, function(err) {
            throw new errors.NotFoundError('role');
        })
        .catch(next);
}

exports.delete = function(req, res, next) {
    const { id } = req.params;
    const Role = req.connection.model('Role');
    const Customer = req.connection.model('Customer');

    Customer.find({ role: id })
        .then(customers => {
            if (customers.length) {
                const customerIds = customers.map(customer => customer.id);
                const message = `Can't delete roles with existing customers. IDs: ${customerIds.join(', ')}`;
                throw new errors.RequestError(message);
            }

            return Role.remove({ _id: id });
        })
        .then(() => res.status(204).json())
        .catch(mongoose.Error.CastError, err => {
            throw new errors.NotFoundError('role');
        })
        .catch(next);
}
