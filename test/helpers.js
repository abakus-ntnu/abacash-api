import sequelizeFixtures from 'sequelize-fixtures';
import db from '../src/models';
import { syncDB } from '../src/model-helpers';

export function loadFixtures(fixtures) {
    const fixturePaths = fixtures.map(file => `./test/fixtures/${file}`);
    return syncDB({ force: true })
    .then(() => sequelizeFixtures.loadFiles(fixturePaths, db));
}
