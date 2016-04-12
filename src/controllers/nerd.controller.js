import request from 'superagent';
import config from '../config';
import { NotFoundError } from '../components/errors';

const path = config.nerd.url + config.nerd.apiKey;

export function list(req, res, next) {
    request
    .get(`${path}/user/find_by_name/`)
    .query({ name: req.query.firstname })
    .query({ surname: req.query.surname })
    .end((err, response) => {
        if (err) next(err);
        res.json(response.body.users || []);
    });
}

export function retrieve(req, res, next) {
    request
    .get(`${path}/user/info/${req.params.username}/`)
    .end((err, response) => {
        if (err) next(err);
        const { users } = response.body;
        if (!users || !users.length) {
            next(new NotFoundError());
        } else {
            res.json(users[0]);
        }
    });
}
