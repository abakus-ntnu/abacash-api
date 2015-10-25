import db from './models';
import config from './config';

export function syncDB({ force } = {}) {
    const logging = config.nodeEnv === 'development' ? console.log : false;
    return db
        .sequelize
        .sync({ force, logging });
}
