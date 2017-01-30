import db from '../models';
import { NotFoundError, ValidationError } from '../components/errors';
import Sequelize from 'sequelize';
import Promise from 'bluebird';
import { omit } from 'lodash';

export function list(req, res, next) {
    db.User.findAll()
    .then(res.json.bind(res))
    .catch(next);
}

export function retrieve(req, res, next) {
    db.User.findOne({ where: {
        id: req.params.id
    },
        include: [db.System]
    })
    .then(user => {
        if (!user) throw new NotFoundError();
        res.json(user);
    })
    .catch(next);
}

export function create(req, res, next) {
    const body = omit(req.body, 'password');

    db.User.invite(body)
    .then(user => {
        if (!body.systems) {
            return user;
        }

        return Promise.map(body.systems, system => {
            const systemId = Object.keys(system)[0];
            return user.setSystems(systemId, { role: system[systemId] });
        }).then(() => user);
    })
    .then(user => {
        res.json(user);
    })
    .catch(Sequelize.ValidationError, err => {
        throw new ValidationError(err);
    })
    .catch(next);
}

export function update(req, res, next) {
    const { body, params } = req;

    db.User.update(body, {
        where: {
            id: params.id
        },
        returning: true
    })
    .spread((count, user) => {
        if (!count) {
            throw new NotFoundError();
        }

        if (!body.systems) {
            return user[0];
        }

        return Promise.map(body.systems, system => {
            const systemId = Object.keys(system)[0];
            return user[0].setSystems(systemId, { role: system[systemId] });
        }).then(() => user[0]);
    })
    .then(user => {
        res.json(user);
    })
    .catch(next);
}

export function destroy(req, res, next) {
    db.User.destroy({ where: {
        id: req.params.id
    } })
    .then(count => {
        if (!count) throw new NotFoundError();
        res.status(204).send();
    })
    .catch(next);
}
