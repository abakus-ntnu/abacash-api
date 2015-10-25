import chai from 'chai';
import request from 'supertest';
import app from '../../src/app';
import customerFixtures from '../fixtures/customers.json';
import { loadFixtures } from '../helpers';

chai.should();

describe('Customer API', () => {
    const fixtures = [
        'systems.json',
        'customers.json'
    ];

    describe('List customers', () => {
        beforeEach(() => loadFixtures(fixtures));

        it('should list customers', done => {
            request(app)
            .get('/api/1/customers')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const customers = res.body;
                customers.length.should.equal(customerFixtures.length);
                customers[0].id.should.equal(1);
                done();
            });
        });

        it('should not list customers from other systems', done => {
            request(app)
            .get('/api/2/customers')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                res.body.length.should.equal(0);
                done();
            });
        });
    });
});
