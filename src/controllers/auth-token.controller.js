import db from '../models';
import { NotFoundError, ModelValidationError } from '../components/errors';
import Sequelize from 'sequelize';

export function list(req, res, next) {
    db.AuthToken.findAll()
    .then(res.json.bind(res))
    .catch(next);
}

export function create(req, res, next) {
    db.AuthToken.generate(req.body)
    .then(token => res.status(201).json(token))
    .catch(Sequelize.ValidationError, err => {
        throw new ModelValidationError(err);
    })
    .catch(next);
}

export function destroy(req, res, next) {
    const { id } = req.params;
    db.AuthToken.destroy({ where: { id } })
    .then((count) => {
        if (!count) throw new NotFoundError();
        res.status(204).send();
    })
    .catch(next);
}
