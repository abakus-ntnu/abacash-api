import db from '../models';
import _ from 'lodash';
import { NotFoundError, ModelValidationError } from '../components/errors';
import Sequelize from 'sequelize';

export function list(req, res, next) {
  db.APIToken.findAll()
    .then(res.json.bind(res))
    .catch(next);
}

export function create(req, res, next) {
  console.log(db.APIToken.generate);
  db.APIToken.generate(req.body)
    .then(token => res.status(201).json(token))
    .catch(Sequelize.ValidationError, err => {
      throw new ModelValidationError(err);
    })
    .catch(next);
}

export function update(req, res, next) {
  db.APIToken.update(req.body, {
    where: {
      id: req.params.id
    },
    returning: true,
    fields: _.without(Object.keys(req.body), 'token')
  })
    .spread((count, token) => {
      if (!count) throw new NotFoundError();
      res.json(token[0]);
    })
    .catch(next);
}

export function destroy(req, res, next) {
  const { id } = req.params;
  db.APIToken.destroy({ where: { id } })
    .then(count => {
      if (!count) throw new NotFoundError();
      res.status(204).send();
    })
    .catch(next);
}
