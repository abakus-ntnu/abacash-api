import chai from 'chai';
import request from 'supertest';
import app from '../../src/app';
import { loadFixtures, test404 } from '../helpers';

chai.should();

describe('Customer API', () => {
    const fixtures = [
        'systems.json',
        'customer-roles.json',
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
                customers.length.should.equal(2);
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
                res.body.length.should.equal(1);
                done();
            });
        });
    });

    describe('Retrieve one customer', () => {
        beforeEach(() => loadFixtures(fixtures));

        it('should retrieve a customer', done => {
            request(app)
            .get('/api/1/customers/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const customer = res.body;
                customer.displayName.should.equal('test customer');
                done();
            });
        });

        it('should return 404 for missing customer', done => {
            test404('/api/1/customers/1337', done);
        });
    });

    describe('Create a new customer ', () => {
        beforeEach(() => loadFixtures(fixtures));

        it('should create a new customer', done => {
            const newCustomer = {
                displayName: 'New Customer',
                username: 'newcus',
                rfid: 'dd:dd:dd:dd',
                balance: 524
            };
            request(app)
            .post('/api/1/customers/')
            .send(newCustomer)
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                const customer = res.body;
                customer.displayName.should.equal(newCustomer.displayName);
                done();
            });
        });

        it('should return a validation error for missing rfid', done => {
            const newCustomer = {
                username: 'newcus',
                displayName: 'New Customer',
                balance: 524
            };
            request(app)
            .post('/api/1/customers/')
            .send(newCustomer)
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                res.body.message.should.equal('notNull Violation: rfid cannot be null');
                res.body.errors.length.should.equal(1);
                done();
            });
        });
    });

    describe('Update a customer ', () => {
        beforeEach(() => loadFixtures(fixtures));

        it('should update rfid and displayName', done => {
            const newCustomer = {
                displayName: 'Updated Customer',
                rfid: 'dd:dd:dd:dd'
            };
            request(app)
            .put('/api/1/customers/1')
            .send(newCustomer)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const customer = res.body;
                customer.displayName.should.equal(newCustomer.displayName);
                customer.rfid.should.equal(newCustomer.rfid);
                done();
            });
        });

        it('should not update id', done => {
            const newCustomer = {
                id: 1234,
                displayName: 'Updated Customer'
            };
            request(app)
            .put('/api/1/customers/1')
            .send(newCustomer)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const customer = res.body;
                customer.displayName.should.equal(newCustomer.displayName);
                customer.id.should.not.equal(newCustomer.id);
                done();
            });
        });

        it('should return 404 for missing customer', done => {
            const newCustomer = {
                displayName: 'Updated Customer',
                rfid: 'dd:dd:dd:dd'
            };
            request(app)
            .put('/api/1/customers/12345')
            .send(newCustomer)
            .expect('Content-Type', /json/)
            .expect(404)
            .end((err, res) => {
                if (err) return done(err);
                res.body.message.should.equal('Could not find the entity');
                done();
            });
        });
    });

    describe('Delete a customer ', () => {
        beforeEach(() => loadFixtures(fixtures));

        it('should delete a customer', done => {
            request(app)
            .delete('/api/1/customers/1')
            .expect(204)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
        });

        it('should return 404 for missing customer', done => {
            test404('/api/1/customers/12345', done, 'delete');
        });
    });
});
