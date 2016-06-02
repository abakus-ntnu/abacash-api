import _ from 'lodash';
import jwt from 'jsonwebtoken';
import { AuthenticationError, NotFoundError, ValidationError } from '../components/errors';
import db from '../models';
import config from '../config';

export function login(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
        const error = new ValidationError('Authentication requires both email and password');
        return next(error);
    }

    const throwAuthError = () => {
        throw new AuthenticationError('Invalid credentials provided');
    };

    let currentUser;
    db.User.findOne({
        where: { email }
    })
    .then(user => {
        if (!user) throwAuthError();
        currentUser = user.get({ plain: true });
        return user.authenticate(password);
    })
    .then(valid => {
        if (!valid) throwAuthError();
        const cleanUser = _.omit(currentUser, 'hash');

        // Even though jwt has a callback method,
        // there's no point in using it as the functions
        // it executes are synchronous:
        return jwt.sign(cleanUser, config.jwtSecret, {
            expiresIn: config.jwtExpiresIn,
            subject: String(currentUser.id)
        });
    })
    .then(token => res.json({ token }))
    .catch(next);
}

export function retrieveInvite(req, res, next) {
    if (!req.user.invite) {
        const error = new ValidationError('Token not valid');
        return next(error);
    }
    return res.json(req.user);
}
export function invite(req, res, next) {
    const { password } = req.body;
    if (!req.user.invite) {
        const error = new ValidationError('Token not valid');
        return next(error);
    }
    db.User.findOne({
        where: { id: req.user.id }
    })
    .then(user => {
        if (!user) throw new NotFoundError();
        return user.updatePassword(password);
    })
    .then(user => {
        const cleanUser = _.omit(user, 'hash');
        // Even though jwt has a callback method,
        // there's no point in using it as the functions
        // it executes are synchronous:
        return jwt.sign(cleanUser, config.jwtSecret, {
            expiresIn: config.jwtExpiresIn,
            subject: String(user.id)
        });
    })
    .then(token => res.json({ token }))
    .catch(next);
}

export function requestReset(req, res, next) {
    const { email } = req.body;
    db.User.findOne({
        where: { email }
    })
    .then(user => {
        if (!user) throw new NotFoundError();
        return user.passwordReset();
    })
    .then(() => res.sendStatus(200))
    .catch(next);
}

export function reset(req, res, next) {
    const { password } = req.body;
    if (!req.user.reset) {
        const error = new ValidationError('Token not valid');
        return next(error);
    }
    db.User.findOne({
        where: { id: req.user.id }
    })
    .then(user => {
        if (!user) throw new NotFoundError();
        return user.updatePassword(password);
    })
    .then(() => res.sendStatus(200))
    .catch(next);
}
