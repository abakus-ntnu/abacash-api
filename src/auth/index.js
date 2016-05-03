import db from '../models';
import config from '../config';
import { AuthenticationError } from '../components/errors';
import Bluebird from 'bluebird';
import expressJwt from 'express-jwt';
import * as authConstants from './constants';

const authenticateJwt = expressJwt({ secret: config.jwtSecret });

function authenticateToken(req, res) {
    return new Bluebird(resolve => {
        const authString = req.get('Authorization');
        if (!authString) {
            return resolve(false);
        }
        const [scheme, token] = req.get('Authorization').split(' ');
        if (scheme !== 'Token') {
            // Only token authentication is accepted
            return resolve(false);
        }

        db.APIToken.findOne({
            where: { token }
        })
        .then(apiToken => {
            if (!apiToken) {
                return resolve(false);
            }
            req.apiToken = apiToken;
            return resolve(true);
        });
    });
}

function authenticateModerator(req, res, next) {
    return new Bluebird(resolve => {
        const authString = req.get('Authorization');
        if (!authString) {
            return resolve(false);
        }
        const scheme = req.get('Authorization').split(' ')[0];
        if (scheme !== 'Bearer') {
            // Only token authentication is accepted
            return resolve(false);
        }
        return authenticateJwt(req, res, next);
    });
}

function authenticateAdministrator(req, res, next) {
    return new Bluebird(resolve => {
        const authString = req.get('Authorization');
        if (!authString) {
            return resolve(false);
        }
        const scheme = req.get('Authorization').split(' ')[0];
        if (scheme !== 'Bearer') {
            // Only token authentication is accepted
            return resolve(false);
        }
        return authenticateJwt(req, res, next);
    });
}

function authenticate(auth, req, res, next) {
    switch (auth) {
    case authConstants.TOKEN: return authenticateToken(req, res);
    case authConstants.MODERATOR: return authenticateModerator(req, res, next);
    case authConstants.ADMINISTRATOR: return authenticateAdministrator(req, res, next);
    }
}

// creates a middleware
export function requires(auth) {
    return (req, res, next) => {
        let aboveLevel = false;
        let isAuthenticated = false;
        Bluebird.each(authConstants.HIERARCHY, authInner => {
            // check if the iteration is at the correct level
            if (auth === authInner) {
                aboveLevel = true;
            }
            // skip if authenticated or we have not yet come to the correc level(s)
            if (isAuthenticated === true || aboveLevel === false) {
                return new Bluebird(resolve => resolve());
            }
            return authenticate(authInner, req, res, next)
            .then(result => {
                isAuthenticated = result;
            });
        })
        .then(() => {
            if (isAuthenticated) {
                next();
            } else {
                next(new AuthenticationError());
            }
        })
        .catch(next);
    };
}
