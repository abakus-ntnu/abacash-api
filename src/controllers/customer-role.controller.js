import db from '../models';

export function create(req, res, next) {
    db.CustomerRole.create({
        ...req.body,
        systemId: req.system.id
    })
    .then(role => {
        res.status(201).json(role);
    })
    .catch(next);
}
