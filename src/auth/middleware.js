import db from '../models';
import { AuthenticationError } from '../components/errors';

export function isTokenAuthenticated(req, res, next) {
    const [scheme, token] = req.get('Authorization').split(' ');
    if (scheme !== 'Token') {
        return next(new AuthenticationError());
    }

    db.APIToken.findOne({
        where: { token }
    })
    .then(apiToken => {
        if (apiToken) {
            req.apiToken = apiToken;
            return next();
        }

        return next(new AuthenticationError());
    })
    .catch(next);
}
