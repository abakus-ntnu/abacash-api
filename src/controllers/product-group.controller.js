import _ from 'lodash';
import Promise from 'bluebird';
import db from '../models';
import { NotFoundError } from '../components/errors';

export function list(req, res, next) {
    req.system.getProductGroups()
    .map(group => Promise.all([group.countProducts(), group.toJSON()])
        .spread((productCount, productGroup) => ({ ...productGroup, productCount }))
    )
    .then(res.json.bind(res))
    .catch(next);
}

export function create(req, res, next) {
    db.ProductGroup.create({
        ...req.body,
        systemId: req.system.id
    })
    .then(role => {
        res.status(201).json(role);
    })
    .catch(next);
}

export function update(req, res, next) {
    const { id } = req.params;
    db.ProductGroup.update(req.body, {
        where: { id },
        returning: true,
        fields: _.without(Object.keys(req.body), 'id')
    })
    .spread((count, roles) => {
        if (!count) throw new NotFoundError();
        res.json(roles[0]);
    })
    .catch(next);
}

export function destroy(req, res, next) {
    const { id } = req.params;
    db.ProductGroup.destroy({
        where: { id }
    })
    .then(count => {
        if (!count) throw new NotFoundError();
        res.status(204).send();
    })
    .catch(next);
}
