import chai from 'chai';
import request from 'supertest';
import app from '../../src/app';
import systemFixtures from '../fixtures/systems.json';
import { loadFixtures } from '../helpers';

chai.should();

describe('System API', () => {
    const fixtures = [
        'systems.json'
    ];

    describe('List systems', () => {
        beforeEach(() => loadFixtures(fixtures));

        it('should list systems', done => {
            request(app)
            .get('/api/systems')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const systems = res.body;
                systems.length.should.equal(systemFixtures.length);
                systems[0].id.should.equal(1);
                done();
            });
        });
    });
});
