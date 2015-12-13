import chai from 'chai';
import request from 'supertest';
import app from '../../src/app';
import { loadFixtures } from '../helpers';

const should = chai.should();

describe('Users API', () => {
    const fixtures = [
        'users.json',
        'systems.json'
    ];

    beforeEach(() => loadFixtures(fixtures));

    describe('List', () => {
        it('should list users', done => {
            request(app)
            .get('/api/users')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const users = res.body;
                users.length.should.equal(2);
                should.exist(users[0].id);
                should.not.exist(users[0].hash);
                done();
            });
        });
    });

    describe('Retrieve', () => {
        it('should retrieve a user', done => {
            request(app)
            .get('/api/users/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                const user = res.body;
                user.name.should.equal('Test Bruker');
                should.not.exist(user.hash);
                done();
            });
        });
    });

    describe('Create', () => {
        it('should create a user', done => {
            const payload = {
                email: 'test@test.com',
                name: 'testuser',
                password: 'testpassword'
            };

            request(app)
            .post('/api/users')
            .send(payload)
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                const user = res.body;
                user.name.should.equal(payload.name);
                should.not.exist(user.hash);
                done();
            });
        });

        it('should create a user and add a system to it', done => {
            const payload = {
                email: 'test@test.com',
                name: 'testuser',
                password: 'testpassword',
                systemId: 1
            };

            request(app)
            .post('/api/users')
            .send(payload)
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                const user = res.body;
                user.name.should.equal(payload.name);
                user.role.should.equal('USER');
                done();
            });
        });
    });

    describe('Update', () => {
        it('should create a user', done => {
            const payload = {
                email: 'test@test.com',
                name: 'testuser',
                password: 'testpassword'
            };

            request(app)
            .post('/api/users')
            .send(payload)
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                const user = res.body;
                user.name.should.equal(payload.name);
                should.not.exist(user.hash);
                done();
            });
        });
    });
});
