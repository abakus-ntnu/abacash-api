import chai from 'chai';
import request from 'supertest';
import app from '../../src/app';
import { ADMINISTRATOR } from '../../src/auth/constants';
import { createAuthorization, loadFixtures, test404 } from '../helpers';

chai.should();

const headers = {
  Authorization: createAuthorization(ADMINISTRATOR)
};

describe('Customer API', () => {
  beforeEach(() => loadFixtures());

  describe('List customers', () => {
    it('should list customers', done => {
      request(app)
        .get('/customers')
        .set(headers)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          const customers = res.body;
          customers.length.should.equal(3);
          done();
        });
    });
  });

  describe('Retrieve one customer', () => {
    it('should retrieve a customer', done => {
      request(app)
        .get('/customers/1')
        .set(headers)
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
      test404('/customers/1337', done, headers);
    });
  });

  describe('Create a new customer ', () => {
    it('should create a new customer', done => {
      const newCustomer = {
        displayName: 'New Customer',
        username: 'newcus',
        rfid: 'dd:dd:dd:dd',
        balance: 524,
        customerRoleId: 1
      };
      request(app)
        .post('/customers/')
        .send(newCustomer)
        .set(headers)
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          const customer = res.body;
          customer.customerRole.role.should.equal('Customer');
          customer.displayName.should.equal(newCustomer.displayName);
          done();
        });
    });

    it('should not create a new customer with identical rfid', done => {
      const newCustomer = {
        username: 'newcust',
        displayName: 'New Customer',
        rfid: 'cb:51:34:49',
        customerRoleId: 1
      };
      request(app)
        .post('/customers/')
        .send(newCustomer)
        .set(headers)
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          res.body.errors[0].message.should.equal('rfid must be unique');
          done();
        });
    });
  });

  describe('Update a customer ', () => {
    it('should update the customer', done => {
      const newCustomer = {
        displayName: 'Updated Customer',
        rfid: 'dd:dd:dd:dd',
        customerRoleId: 1
      };
      request(app)
        .put('/customers/1')
        .send(newCustomer)
        .set(headers)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          const customer = res.body;
          customer.displayName.should.equal(newCustomer.displayName);
          customer.customerRole.role.should.equal('Customer');
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
        .put('/customers/1')
        .send(newCustomer)
        .set(headers)
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
        .put('/customers/12345')
        .send(newCustomer)
        .set(headers)
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
    it('should delete a customer', done => {
      request(app)
        .delete('/customers/1')
        .set(headers)
        .expect(204)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });

    it('should return 404 for missing customer', done => {
      test404('/customers/12345', done, headers, 'delete');
    });
  });
});
