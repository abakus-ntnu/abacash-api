import _ from 'lodash';
import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../models';
import app from '../app';
import { AuthenticationError, ValidationError } from '../components/errors';

const router = express.Router();

router.post('/', (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        const error = new ValidationError('Authentication requires both email and password');
        return next(error);
    }

    const throwAuthError = () => {
        throw new AuthenticationError('Invalid credentials provided');
    };

    let _user;
    db.User.findOne({
        where: { email }
    })
    .then(user => {
        if (!user) throwAuthError();
        _user = user.get({ plain: true });
        return user.authenticate(password);
    })
    .then(valid => {
        if (!valid) throwAuthError();
        const secret = app.get('jwt secret');
        const cleanUser = _.omit(_user, 'hash');

        // Even though jwt has a callback method,
        // there's no point in using it as the functions
        // it executes are synchronous:
        return jwt.sign(cleanUser, secret, {
            expiresIn: '7 days',
            subject: _user.id
        });
    })
    .then(token => res.json({ token, user: _user }))
    .catch(next);
});

export default router;
