import chai from 'chai';
import request from 'supertest';
import app from '../../src/app';
import { loadFixtures } from '../helpers';

const should = chai.should();

describe('Customer Role API', () => {
    const fixtures = [
        'systems.json'
    ];

    beforeEach(() => loadFixtures(fixtures));

    describe('Create Role', () => {
        it('should create a role', done => {
            const payload = {
                role: 'something',
                internalSales: true,
                isSeller: true
            };

            request(app)
            .post('/api/1/roles')
            .send(payload)
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                const role = res.body;
                should.exist(role.id);
                role.role.should.equal(payload.role);
                role.internalSales.should.equal(payload.internalSales);
                role.isSeller.should.equal(payload.isSeller);
                done();
            });
        });
    });
});
