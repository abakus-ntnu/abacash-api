import nodemailer from 'nodemailer';
import config from '../../config';
import handlebars from 'express-handlebars';
import Bluebird from 'bluebird';
import hbs from 'nodemailer-express-handlebars';
import { handleError } from './../errors';
import logger from 'winston';
import path from 'path';

const options = hbs({
    viewEngine: handlebars.create({}),
    viewPath: path.resolve(__dirname.replace('/dist/', '/src/'))
});

const transporter = Bluebird.promisifyAll(nodemailer.createTransport(config.smtpUrl));
transporter.use('compile', options);

export function sendResetEmail(user, token) {
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
    .catch(handleError);
}

export function sendInviteEmail(user, token) {
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
    .catch(handleError);
}
