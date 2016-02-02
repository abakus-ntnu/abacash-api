import chai from 'chai';
import { isTokenAuthenticated } from '../../src/auth/auth.service';
import { AuthenticationError } from '../../src/components/errors';
import { loadFixtures } from '../helpers';

const should = chai.should();

describe('APIToken Middleware', () => {
    const createNext = done => err => {
        err.should.be.an.instanceOf(AuthenticationError);
        err.message
            .should.equal('You need to authenticate to access this resource');
        done();
    };

    describe('Unit Tests', () => {
        it('should call next with an error for invalid Authorization types', done => {
            const res = {};
            const req = {
                get(header) {
                    header.should.equal('Authorization');
                    return 'nottoken 123tdfaj43k';
                }
            };

            isTokenAuthenticated(req, res, createNext(done));
        });

        it('should call next if it can\'t find the token', done => {
            const res = {};
            const req = {
                get(header) {
                    header.should.equal('Authorization');
                    return 'Token 123tdfaj43k';
                }
            };

            isTokenAuthenticated(req, res, createNext(done));
        });
    });

    describe('Database Tests', () => {
        const fixtures = [
            'systems.json',
            'api-tokens.json'
        ];

        beforeEach(() => loadFixtures(fixtures));

        it('should call next without an error for valid tokens', done => {
            const res = {};
            const req = {
                get(header) {
                    header.should.equal('Authorization');
                    return 'Token d54f9200b680ff11eb1ffcb01a99bde2';
                }
            };

            const next = err => {
                should.not.exist(err);
                done();
            };

            isTokenAuthenticated(req, res, next);
        });

        it('should set req.apiToken when the token is correct', done => {
            const res = {};
            const req = {
                get(header) {
                    header.should.equal('Authorization');
                    return 'Token d54f9200b680ff11eb1ffcb01a99bde2';
                }
            };

            const next = () => {
                req.apiToken.id.should.equal(1);
                done();
            };

            isTokenAuthenticated(req, res, next);
        });

        it('should call next with an error for invalid tokens', done => {
            const res = {};
            const req = {
                get(header) {
                    header.should.equal('Authorization');
                    return 'Token blabalinvalid';
                }
            };

            isTokenAuthenticated(req, res, createNext(done));
        });
    });
});
