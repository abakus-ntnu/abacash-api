import chai from 'chai';
import request from 'supertest';
import app from '../../src/app';
import { loadFixtures, test404 } from '../helpers';

chai.should();

describe('Transaction API', () => {

    const fixtures = [
        'systems.json',
        'customers.json',
        'customer-role.json',
        'products.json',
        'transactions.json',
    ];

    describe('List transactions', () => {

        beforeEach(() => loadFixtures(fixtures));

        it('should list transactions', done => {
            request(app)
            .get('/api/1/transactions')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                res.body.length.should.equal(2);
                done();
            });
        });

        it('should not list transactions from other systems', done => {
            request(app)
            .get('/api/2/transactions')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                res.body.length.should.equal(1);
                done();
            });
        });

        beforeEach(() => loadFixtures(fixtures));

        it('should retrieve a transaction', done => {
            request(app)
            .get('/api/1/transactions/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                res.body.id.should.equal(1);
                done();
            });
        });

        it('should return 404 for missing transaction', done => {
            test404('/api/1/transactions/1337', done);
        });
    });


    describe('Add a new transaction ', () => {

        beforeEach(() => loadFixtures(fixtures));

        it('should add a new transaction', done => {
            const newTransaction = {
                sellerId: 1,
                customerId: 2,
                products: [1, 2]
            };
            request(app)
            .post('/api/1/transactions/')
            .send(newTransaction)
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                res.body.sellerId.should.equal(newTransaction.sellerId);
                done();
            });
        });

        it('should return a validation error for customerId', done => {
            const newTransaction = {
                sellerId: 1,
                products: [1, 2]
            };
            request(app)
            .post('/api/1/transactions/')
            .send(newTransaction)
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                res.body.message.should.equal('notNull Violation: customerId cannot be null');
                res.body.errors.length.should.equal(1);
                done();
            });
        });

        it('should return a validation error for sellerId', done => {
            const newTransaction = {
                customerId: 1,
                products: [1, 2]
            };
            request(app)
            .post('/api/1/transactions/')
            .send(newTransaction)
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                res.body.message.should.equal('notNull Violation: sellerId cannot be null');
                res.body.errors.length.should.equal(1);
                done();
            });
        });

        it('should return a validation error when missing products', done => {
            const newTransaction = {
                customerId: 1,
                sellerId: 2
            };
            request(app)
            .post('/api/1/transactions/')
            .send(newTransaction)
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                console.log(res.body);
                res.body.message.should.equal('A transaction must contain at least one product');
                done();
            });
        });

        it('should return a validation error when empty product list', done => {
            const newTransaction = {
                customerId: 1,
                sellerId: 2,
                products: []
            };
            request(app)
            .post('/api/1/transactions/')
            .send(newTransaction)
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                console.log(res.body);
                res.body.message.should.equal('A transaction must contain at least one product');
                done();
            });
        });
    });
});
