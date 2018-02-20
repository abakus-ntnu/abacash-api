import chai from 'chai';
import request from 'supertest';
import app from '../../src/app';
import { ADMINISTRATOR } from '../../src/auth/constants';
import { loadFixtures, createAuthorization } from '../helpers';

chai.should();

const headers = {
  Authorization: createAuthorization(ADMINISTRATOR)
};

describe('Product API', () => {
  describe('List all products', () => {
    beforeEach(() => loadFixtures());

    it('should list all products', done => {
      request(app)
        .get('/products/')
        .set(headers)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          const products = res.body;
          products.length.should.equal(3);
          products[0].id.should.equal(1);
          products[0].name.should.equal('Test product 1');
          done();
        });
    });
  });

  describe('List active products', () => {
    beforeEach(() => loadFixtures());

    it('should list active products', done => {
      request(app)
        .get('/products/?active=true')
        .set(headers)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          const products = res.body;
          products.length.should.equal(3);
          done();
        });
    });
  });

  describe('List all active products of type', () => {
    beforeEach(() => loadFixtures());

    it('should list active products', done => {
      request(app)
        .get('/products/?productGroupId=1&active=true')
        .set(headers)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          console.log(res.body);
          const products = res.body;
          products.length.should.equal(1);
          products[0].productGroupId.should.equal(1);
          done();
        });
    });
  });

  describe('List a single product', () => {
    beforeEach(() => loadFixtures());

    it('should return a product from a current system', done => {
      request(app)
        .get('/products/1')
        .set(headers)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          res.body.name.should.equal('Test product 1');
          done();
        });
    });

    it("should return 404 on product that doesn't exist", done => {
      request(app)
        .get('/products/1337')
        .set(headers)
        .expect(404, done);
    });

    it('should return 404 on product that exists, but are not in the current system.', done => {
      request(app)
        .get('/products/4')
        .set(headers)
        .expect(404, done);
    });
  });

  describe('Create products', () => {
    beforeEach(() => loadFixtures());

    it('should create a product', done => {
      request(app)
        .post('/products')
        .send({
          type: 'Created Type',
          price: 1337.99,
          internalPrice: 1337.0,
          name: 'Created Product',
          active: true,
          stock: 0
        })
        .set(headers)
        .expect(201, done);
    });
  });

  describe('Destroy product', () => {
    beforeEach(() => loadFixtures());

    it('should delete an existing product', done => {
      request(app)
        .delete('/products/1')
        .set(headers)
        .expect(204, done);
    });
    it('should return not found if product not found', done => {
      request(app)
        .delete('/products/4')
        .set(headers)
        .expect(404, done);
    });
  });
});
