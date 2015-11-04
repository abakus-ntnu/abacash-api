import db from '../models';
import { AuthenticationError } from '../components/errors';

export function isTokenAuthenticated(req, res, next) {
    const [scheme, token] = req.get('Authorization').split(' ');
    if (scheme !== 'Token') {
        return next(new AuthenticationError());
    }

    db.AuthToken.findOne({
        where: { token }
    })
    .then(authToken => {
        if (authToken) {
            req.authToken = authToken;
            return next();
        }

        return next(new AuthenticationError());
    })
    .catch(next);
}
