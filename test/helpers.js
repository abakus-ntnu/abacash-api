import request from 'supertest';
import sequelizeFixtures from 'sequelize-fixtures';
import db from '../src/models';
import app from '../src/app';
import { syncDB } from '../src/model-helpers';

export function loadFixtures(fixtures) {
    const fixturePaths = fixtures.map(file => `./test/fixtures/${file}`);
    return syncDB({ force: true })
    .then(() => sequelizeFixtures.loadFiles(fixturePaths, db));
}

export function test404(url, done, method = 'get') {
    const requestMethod = request(app)[method];
    requestMethod(url)
        .expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
            if (err) return done(err);
            res.body.message.should.equal('Could not find the entity');
            done();
        });
}
