import chai from 'chai';
import request from 'supertest';
import app from '../../src/app';
import { ADMINISTRATOR } from '../../src/auth/constants';
import { loadFixtures, createAuthorization } from '../helpers';

const should = chai.should();

const headers = {
    Authorization: createAuthorization(ADMINISTRATOR)
};

describe('Product Group API', () => {
    beforeEach(() => loadFixtures());

    describe('List Product Groups', () => {
        it('should list product groups', done => {
            request(app)
            .get('/1/product-groups')
            .set(headers)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const productGroups = res.body;
                productGroups.length.should.equal(3);
                productGroups[0].id.should.equal(1);
                done();
            });
        });
    });

    describe('Create Role', () => {
        it('should create a product group', done => {
            const payload = {
                name: 'new group'
            };

            request(app)
            .post('/1/product-groups')
            .send(payload)
            .set(headers)
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                const productGroup = res.body;
                should.exist(productGroup.id);
                productGroup.name.should.equal(payload.name);
                done();
            });
        });
    });

    describe('Update Role', () => {
        it('should update a product group', done => {
            const payload = {
                name: 'changed'
            };

            request(app)
            .put('/1/product-groups/1')
            .send(payload)
            .set(headers)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const productGroup = res.body;
                productGroup.name.should.equal(payload.name);
                done();
            });
        });

        it('should return 404 for invalid product groups', done => {
            const payload = {
                name: 'changed'
            };

            request(app)
            .put('/1/product-groups/1337')
            .send(payload)
            .set(headers)
            .expect('Content-Type', /json/)
            .expect(404)
            .end((err, res) => {
                if (err) return done(err);
                const error = res.body;
                error.message.should.equal('Could not find the entity');
                done();
            });
        });
    });

    describe('Delete Role', () => {
        it('should delete a role', done => {
            request(app)
            .delete('/1/product-groups/1')
            .set(headers)
            .expect(204)
            .end((err, res) => done(err));
        });
    });
});
