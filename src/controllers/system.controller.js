import db from '../models';
import NotFoundError from '../components/errors';

export function list(req, res, next) {
    db.System.findAll()
        .then(res.json.bind(res))
        .catch(next);
}

export function retrieve(req, res, next) {
    const { id } = req.params;
    db.System.findOne({
        where: { id }
    })
    .then(system => {
        if (!system) throw new NotFoundError();
        res.json(system);
    })
    .catch(next);
}

/*
// Get a single system
exports.show = function(req, res, next) {
    const Role = req.connection.model('Role');
    let _system;

    System.retrieveById(req.params.system)
        .then(system => {
            _system = system.toObject();
            return Bluebird.map(_system.roles, id => Role.findById(id));
        })
        .then(roles => {
            _system.roles = roles;
            return res.json(_system);
        })
        .catch(next);
};

exports.create = function(req, res, next) {
    System.create(req.body)
        .then(system => {
            connection.createSystem(system);
            res.status(201).json(system);
        })
        .catch(mongoose.Error.ValidationError, err => {
            throw new errors.ValidationError(err.errors);
        })
        .catch(next);
};

// Updates an existing system in the DB.
exports.update = function(req, res, next) {
    System.retrieveById(req.params.system)
        .then(system => {
            var updated = _.merge(system, req.body);
            return updated.save();
        })
        .then(res.json.bind(res))
        .catch(next);
};

exports.createRole = function(req, res, next) {
    if (_.isEmpty(req.body)) return next(new errors.ValidationError());
    const Role = req.connection.model('Role');

    System.retrieveById(req.params.system)
        .then(system => {
            var role = new Role(req.body);
            return system.addRole(role);
        })
        .then(res.json.bind(res))
        .catch(next);
}
*/
