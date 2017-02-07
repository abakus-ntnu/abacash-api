import chai from 'chai';
import request from 'supertest';
import app from '../../src/app';
import { MODERATOR } from '../../src/auth/constants';
import { loadFixtures, createAuthorization } from '../helpers';

chai.should();

const headers = {
    Authorization: createAuthorization(MODERATOR)
};

describe('NERD API', () => {
    before(() => loadFixtures([]));

    it('should return an empty array if no matches', done => {
        request(app)
        .get('/nerd/?firstname=NoUserHasThisName')
        .set(headers)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            const users = res.body;
            users.should.be.instanceOf(Array);
            users.length.should.equal(0);
            done();
        });
    });

    it('should return a 404 if user is not found', done => {
        request(app)
        .get('/nerd/noUserHasThisUsername')
        .set(headers)
        .expect(404)
        .end(done);
    });
});
