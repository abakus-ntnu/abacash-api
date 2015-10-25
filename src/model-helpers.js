import db from './models';

export function syncDB({ force } = {}) {
    return db
        .sequelize
        .sync({ force });
}
