/* eslint-disable no-unused-expressions */
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import db from '../../src/models';
import { syncDB } from '../../src/model-helpers';

chai.use(chaiAsPromised);
const should = chai.should();

describe('User Model', () => {
    beforeEach(() => syncDB({ force: true }));

    describe('#register()', () => {
        it('should create a hashed password', () => {
            const body = {
                email: 'eh@eh.com',
                name: 'testuser'
            };

            return db.User.register(body, 'testpassword')
            .then(user => {
                should.exist(user.hash);
                user.name.should.equal(body.name);
            });
        });
    });

    describe('#authenticate()', () => {
        it('should authenticate valid pws', () => {
            const password = 'testpw';
            const body = {
                email: 'eh@eh.com',
                name: 'testuser'
            };

            return db.User.register(body, password)
            .then(user =>
                user.authenticate(password).should.eventually.be.true
            );
        });

        it('should not authenticate invalid pws', () => {
            const body = {
                email: 'eh@eh.com',
                name: 'testuser'
            };

            return db.User.register(body, 'password')
            .then(user =>
                user.authenticate('notpassword').should.eventually.be.false
            );
        });
    });

    describe('#invite()', () => {
        it('should send an invite email', () => {
            const body = {
                email: 'test@eh.com',
                name: 'test user'
            };

            return db.User.invite(body)
            .then(response => {
                const user = response.toJSON();
                user.name.should.equal(body.name);
                should.not.exist(user.hash);
            });
        });
    });
});
