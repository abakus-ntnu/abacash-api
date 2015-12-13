import { NotFoundError, ModelValidationError } from '../components/errors';
import config from '../config';
import request from 'superagent';
import _ from 'lodash';

const path = config.nerd.url + config.nerd.apiKey;

export function list(req, res, next) {
    request
    .get(path + '/user/find_by_name/')
    .query({ name: req.query.firstname })
    .query({ surname: req.query.surname })
    .end(function(err, response){
        if (err) next(err);
        res.json(response.body.users);
    })
}

export function retrieve(req, res, next) {
    request
    .get(path  + '/user/info/' + req.params.username)
    .end(function(err, response){
        if (err) next(err);
        res.json(response.body.users[0]);
    })
}
