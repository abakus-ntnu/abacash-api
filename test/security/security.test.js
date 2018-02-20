import app from '../../src/app';
import chai from 'chai';
import request from 'supertest';
import Bluebird from 'bluebird';
import { loadFixtures, createAuthorization } from '../helpers';
import {
  TOKEN,
  MODERATOR,
  ADMINISTRATOR,
  HIERARCHY,
  AUTH_NAMES
} from '../../src/auth/constants';

chai.should();

function checkAuthorization(
  auth,
  httpVerb,
  controller,
  shouldBeAuthenticatedForLevel
) {
  return new Bluebird(resolve => {
    request(app)
      [httpVerb.toLowerCase()](controller)
      .set('Authorization', createAuthorization(auth))
      .end((err, res) => {
        if (shouldBeAuthenticatedForLevel) {
          chai.assert.notEqual(
            res.status,
            401,
            `${httpVerb} ${controller} should be allowed with ${
              AUTH_NAMES[auth]
            }`
          );
        } else {
          chai.assert.equal(
            res.status,
            401,
            `${httpVerb} ${controller} should not be allowed with ${
              AUTH_NAMES[auth]
            }`
          );
        }
        resolve();
      });
  });
}
function testSecurity(controller, httpVerb, authId) {
  it(`${controller} should be ${authId}  authenticated for ${httpVerb}`, done => {
    let shouldBeAuthenticatedForLevel = false;
    Bluebird.each(HIERARCHY, auth => {
      if (auth === authId) {
        // we have iterated to the correct level, it should be authenticated
        // for all levels and up
        shouldBeAuthenticatedForLevel = true;
      }
      return checkAuthorization(
        auth,
        httpVerb,
        controller,
        shouldBeAuthenticatedForLevel
      );
    }).nodeify(done);
  });
}

describe('Security', () => {
  beforeEach(() => loadFixtures(['systems.json', 'api-tokens.json']));
  describe('Auth API', () => {
    testSecurity('/authenticate/reset', 'POST', MODERATOR);
    testSecurity('/authenticate/invite', 'GET', MODERATOR);
    testSecurity('/authenticate/invite', 'POST', MODERATOR);
  });
  describe('API Token API', () => {
    testSecurity('/api-tokens', 'GET', MODERATOR);
    testSecurity('/api-tokens', 'POST', MODERATOR);
    testSecurity('/api-tokens', 'DELETE', MODERATOR);
  });
  describe('Customer Roles API', () => {
    testSecurity('/roles', 'GET', MODERATOR);
    testSecurity('/roles', 'POST', MODERATOR);
    testSecurity('/roles', 'PUT', MODERATOR);
    testSecurity('/roles', 'DELETE', MODERATOR);
  });
  describe('Customer API', () => {
    testSecurity('/customers', 'GET', TOKEN);
    testSecurity('/customers/1', 'GET', TOKEN);
    testSecurity('/customers', 'POST', TOKEN);
    testSecurity('/customers/1', 'PUT', TOKEN);
    testSecurity('/customers/1', 'DELETE', MODERATOR);
  });
  describe('Nerd API', () => {
    testSecurity('/nerd', 'GET', TOKEN);
    testSecurity('/nerd/username', 'GET', TOKEN);
  });
  describe('Products API', () => {
    testSecurity('/products', 'GET', TOKEN);
    testSecurity('/products/1', 'GET', TOKEN);
    testSecurity('/products', 'POST', MODERATOR);
    testSecurity('/products/1', 'DELETE', MODERATOR);
  });
  describe('Transaction API', () => {
    testSecurity('/transactions', 'GET', MODERATOR);
    testSecurity('/transactions/1', 'GET', MODERATOR);
    testSecurity('/transactions', 'POST', TOKEN);
  });
  describe('Users API', () => {
    testSecurity('/users', 'GET', MODERATOR);
    testSecurity('/users/1', 'GET', MODERATOR);
    testSecurity('/users', 'GET', MODERATOR);
    testSecurity('/users/1', 'PUT', MODERATOR);
    testSecurity('/users/1', 'DELETE', MODERATOR);
  });
});
