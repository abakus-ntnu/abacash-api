import nodemailer from 'nodemailer';
import config from '../../config';
import handlebars from 'express-handlebars';
import Promise from 'bluebird';
import hbs from 'nodemailer-express-handlebars';
import stubTransport from 'nodemailer-stub-transport';
import { handleError } from './../errors';
import logger from 'winston';
import path from 'path';

let transport;
if (config.nodeEnv === 'production') transport = config.smtpUrl;
else transport = stubTransport();

const options = hbs({
    viewEngine: handlebars.create({}),
    viewPath: path.resolve(__dirname)
});

const transporter = Promise.promisifyAll(nodemailer.createTransport(transport));
transporter.use('compile', options);

export function sendReset(user, token) {
    const mailOptions = {
        to: user.email,
        from: 'Abacash <abacash@abakus.no>',
        subject: 'Tilbakestill passord, Abacash',
        template: 'action',
        context: {
            content: `Du har forespurt en tilbakestilling av passordet ditt.
                 Trykk på knappen nedenfor for å sette nytt passord. Dersom du ikke har
                 sendt denne forespørselen kan du ignorere denne eposten.`,
            action: {
                text: 'Tilbakestill passord',
                url: `${config.web}/login/reset/?token=${token}`
            }
        }
    };

    return transporter.sendMailAsync(mailOptions)
        .then(value => {
            logger.info(`Message sendt: ${value.response}`);
            return user;
        })
        .catch(err => handleError(err));
}

export function sendInvite(user, token) {
    const mailOptions = {
        to: user.email,
        from: 'Abacash <abacash@abakus.no>',
        subject: 'Velkommen til Abacash!',
        template: 'action',
        context: {
            content: `Det har blitt opprettet en bruker for deg på Abacash, trykk på knappen under
                for å fullføre registreringen.`,
            action: {
                text: 'Registrer bruker',
                url: `${config.web}/login/invite?token=${token}`
            }
        }
    };

    return transporter.sendMailAsync(mailOptions)
        .then(value => {
            logger.info(`Message sendt: ${value.response}`);
            return user;
        })
        .catch(err => handleError(err));
}
