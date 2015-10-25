import chai from 'chai';
import request from 'supertest';
import app from '../../src/app';
import { loadFixtures } from '../helpers';

chai.should();

describe('Product API', () => {
    const fixtures = [
        'systems.json',
        'products.json'
    ];

    describe('List all products', () => {

        beforeEach(() => loadFixtures(fixtures));

        it('should list all products', done => {
            request(app)
            .get('/api/1/products/all')
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

        it('should keep systems separate all products', done => {
            request(app)
            .get('/api/2/products/all')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const products = res.body;
                products.length.should.equal(1);
                products[0].id.should.equal(4);
                done();
            });
        });

    });

    describe('List active products', () => {

        beforeEach(() => loadFixtures(fixtures));

        it('should list active products', done => {
            request(app)
            .get('/api/1/products')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const products = res.body;
                products.length.should.equal(2);
                done();
            });
        });
    });

    describe('List a single product', () => {

        beforeEach(() => loadFixtures(fixtures));
        
        it('should return a product from a current system', done => {
            request(app)
            .get('/api/1/products/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                res.body.name.should.equal('Test product 1');
                done();
            });

        });

        it('should return 404 on product that doesn\'t exist', done => {
            request(app)
            .get('/api/1/products/1337')
            .expect(404, done);
        });

        it('should return 404 on product that exists, but are not in the current system.', done => {
            request(app)
            .get('/api/1/products/4')
            .expect(404, done)
        });
    });

    describe('Create products', () => {
    
        beforeEach(() => loadFixtures(fixtures));

        it('should create a product', done => {
            request(app)
            .post('/api/1/products')
            .send({
                type: 'Created Type',
                price: 1337.99,
                internalPrice: 1337.00,
                name: 'Created Product',
                active: true,
                stock: 500
            })
            .expect(201, done);
        });

        it('should create not create a product with negative stock', done => {
            request(app)
            .post('/api/1/products')
            .send({
                type: 'Created Type',
                price: 1337.99,
                internalPrice: 1337.00,
                name: 'Created Product',
                active: true,
                stock: -500
            })
            .expect(400, done);
        });

    });
});
