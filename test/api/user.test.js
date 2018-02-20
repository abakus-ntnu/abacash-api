import chai from 'chai';
import request from 'supertest';
import app from '../../src/app';
import { ADMINISTRATOR } from '../../src/auth/constants';
import { loadFixtures, createAuthorization } from '../helpers';

const should = chai.should();

const headers = {
  Authorization: createAuthorization(ADMINISTRATOR)
};

describe('Users API', () => {
  beforeEach(() => loadFixtures());

  describe('List', () => {
    it('should list users', done => {
      request(app)
        .get('/users')
        .set(headers)
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
        .get('/users/1')
        .set(headers)
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
    it('should create an invite and send it to a new user', done => {
      const payload = {
        email: 'test@test.com',
        name: 'testuser'
      };

      request(app)
        .post('/users')
        .send(payload)
        .set(headers)
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

    it('should invite a new user', done => {
      const payload = {
        email: 'test@test.com',
        name: 'testuser'
      };

      request(app)
        .post('/users')
        .send(payload)
        .set(headers)
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          const user = res.body;
          user.name.should.equal(payload.name);
          done();
        });
    });
  });

  describe('Update', () => {
    it('should update a user', done => {
      const payload = {
        email: 'test@test.com',
        name: 'newname'
      };

      request(app)
        .put('/users/1')
        .send(payload)
        .set(headers)
        .expect('Content-Type', /json/)
        .expect(200)
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
