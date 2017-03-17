import db from '../models';
import logger from 'winston';

export function get(req, res, next) {
    db.sequelize.authenticate()
    .then(error => {
        if (error) {
            logger.error('Healthcheck Failed', error);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    })
    .catch(error => {
        logger.error('Healthcheck Failed', error);
        res.sendStatus(500);
    });
}
