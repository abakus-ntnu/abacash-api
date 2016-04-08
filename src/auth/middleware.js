import expressJwt from 'express-jwt';
import db from '../models';
import config from '../config';
import { AuthenticationError } from '../components/errors';

export function isTokenAuthenticated(req, res, next) {
    const authString = req.get('Authorization');
    if (!authString) {
        // No auth header provided
        return next(new AuthenticationError());
    }
    const [scheme, token] = req.get('Authorization').split(' ');
    if (scheme !== 'Token') {
        // Only token authentication is accepted
        return next(new AuthenticationError());
    }

    db.APIToken.findOne({
        where: { token }
    })
    .then(apiToken => {
        if (!apiToken) {
            return next(new AuthenticationError());
        }
        req.apiToken = apiToken;
        return next();
    })
    .catch(next);
}

export const isAuthenticated = expressJwt({ secret: config.jwtSecret });
