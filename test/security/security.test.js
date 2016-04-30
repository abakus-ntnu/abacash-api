import app from '../../src/app';
import chai from 'chai';
import request from 'supertest';
import Bluebird from 'bluebird';
import { loadFixtures, createAuthorization } from '../helpers';
import { TOKEN, HIERARCHY, name } from '../../src/auth/constants';

chai.should();

function testSecurity(controller, httpVerb, authId) {
    it(`${controller} should be ${authId}  authenticated for ${httpVerb}`, done => {
        let shouldBeAuthenticatedForLevel = false;
        Bluebird.each(HIERARCHY, auth => {
            if (auth === authId) {
                // we have iterated to the correct level, it should be authenticated
                // for all levels and up
                shouldBeAuthenticatedForLevel = true;
            }
            return new Bluebird(resolve => {
                request(app)[httpVerb.toLowerCase()](controller)
                .set('Authorization', createAuthorization(auth))
                .end((err, res) => {
                    if (shouldBeAuthenticatedForLevel) {
                        chai.assert.notEqual(
                            res.status,
                            401,
                            `${httpVerb} ${controller} should be allowed with ${name(auth)}`
                        );
                    } else {
                        chai.assert.equal(
                            res.status,
                            401,
                            `${httpVerb} ${controller} should not be allowed with ${name(auth)}`
                        );
                    }
                    resolve();
                });
            });
        }).then(() => done());
    });
}

describe('Security', () => {
    beforeEach(() => loadFixtures([
        'systems.json',
        'api-tokens.json'
    ]));
    describe('Transaction API', () => {
        testSecurity('/1/transactions/', 'GET', TOKEN);
        testSecurity('/1/transactions/1/', 'GET', TOKEN);
        testSecurity('/1/transactions/', 'POST', TOKEN);
    });
});
