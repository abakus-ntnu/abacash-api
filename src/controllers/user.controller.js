import db from '../models';
import { NotFoundError, ValidationError } from '../components/errors';
import Sequelize from 'sequelize';
import _ from 'lodash';


export function list(req, res, next) {
    db.User.findAll({
         include: [ db.System ]
     })
    .then(res.json.bind(res))
    .catch(next);
}

export function me(req, res, next) {
    db.User.findOne({ where: {
        id: req.user.id
    },
        include: [ db.System ]
    })
    .then(user => {
        if (!user) throw new NotFoundError();
        res.json(user);
    })
    .catch(next);
}


export function retrieve(req, res, next) {
    db.User.findOne({ where: {
        id: req.params.id
    },
        include: [ db.System ]
    })
    .then(user => {
        if (!user) throw new NotFoundError();
        res.json(user);
    })
    .catch(next);
}

export function create(req, res, next) {
    let _user;
    db.User.create({
        ...req.body
    })
    .then(user => {
        if(!req.body.systemId) return res.status(201).json(user);
        _user = user;
        return user.addSystem(req.body.systemId);
    })
    .then(role => {
        const user = _user.get({ plain: true });
        user.role = role;
        res.status(201).json(user);
    })
    .catch(Sequelize.ValidationError, err => {
        throw new ValidationError(err);
    })
    .catch(next);
}

export function update(req, res, next) {
    db.User.update(req.body, {
        where: {
            id: req.params.id
        },
        returning: true,
        fields: _.without(Object.keys(req.body), 'id')
    })
    .spread((count, user) => {
        if (!count) throw new NotFoundError();
        res.json(user[0]);
    })
    .catch(next);
}

export function destroy(req, res, next) {
    db.User.destroy({ where: {
            id: req.params.id
    }})
    .then((count) => {
        if (!count) throw new NotFoundError();
        res.status(204).send();
    })
    .catch(next);
}
