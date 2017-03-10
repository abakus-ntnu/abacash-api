import request from 'superagent';
import config from '../config';

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
