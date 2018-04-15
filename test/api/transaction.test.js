import chai from 'chai';
import request from 'supertest';
import app from '../../src/app';
import { MODERATOR } from '../../src/auth/constants';
import { loadFixtures, test404, createAuthorization } from '../helpers';

const headers = {
  Authorization: createAuthorization(MODERATOR)
};

chai.should();

describe('Transaction API', () => {
  describe('List transactions', () => {
    beforeEach(() => loadFixtures());

    it('should list transactions', done => {
      request(app)
        .get('/transactions')
        .set(headers)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          res.body.length.should.equal(2);
          done();
        });
    });

    beforeEach(() => loadFixtures());

    it('should retrieve a transaction', done => {
      request(app)
        .get('/transactions/1')
        .set(headers)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          res.body.id.should.equal(1);
          done();
        });
    });

    it('should return 404 for missing transaction', done => {
      test404('/transactions/1337', done, headers);
    });
  });

  describe('Add a new transaction ', () => {
    beforeEach(() => loadFixtures());

    it('should add a new transaction', done => {
      const newTransaction = {
        sellerId: 1,
        customerId: 2,
        products: [1]
      };
      request(app)
        .post('/transactions/')
        .send(newTransaction)
        .set(headers)
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
        products: [1]
      };
      request(app)
        .post('/transactions/')
        .send(newTransaction)
        .set(headers)
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          res.body.message.should.equal('Customer for transaction not found');
          done();
        });
    });

    // TODO Move config like default seller and require seller from env
    // variables to config table such that this can be tested.
    //
    // it('should return a validation error for sellerId = null on seller enforced system', done => {
    //   const newTransaction = {
    //     sellerId: 3, // seller id is not a seller
    //     customerId: 1,
    //     products: [1]
    //   };
    //   request(app)
    //     .post('/transactions/') // system 1 enforces seller
    //     .send(newTransaction)
    //     .set(headers)
    //     .expect('Content-Type', /json/)
    //     .expect(400)
    //     .end((err, res) => {
    //       if (err) return done(err);
    //       res.body.message.should.equal('sellerId does not belong to a seller');
    //       done();
    //     });
    // });
    //
    // it('should return a validation error if the sellerId does not belong to a seller', done => {
    //   const newTransaction = {
    //     customerId: 1,
    //     products: [1]
    //   };
    //   request(app)
    //     .post('/transactions/') // system 1 enforces seller
    //     .send(newTransaction)
    //     .set(headers)
    //     .expect('Content-Type', /json/)
    //     .expect(400)
    //     .end((err, res) => {
    //       if (err) return done(err);
    //       res.body.message.should.equal(
    //         'A transaction for this system requires a seller'
    //       );
    //       done();
    //     });
    // });

    it('should return a validation error when missing products', done => {
      const newTransaction = {
        customerId: 1,
        sellerId: 2
      };
      request(app)
        .post('/transactions/')
        .send(newTransaction)
        .set(headers)
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          res.body.message.should.equal(
            'A transaction must contain at least one product'
          );
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
        .post('/transactions/')
        .send(newTransaction)
        .set(headers)
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          res.body.message.should.equal(
            'A transaction must contain at least one product'
          );
          done();
        });
    });
  });
});
