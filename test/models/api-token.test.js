import chai from 'chai';
import db from '../../src/models';
import { loadFixtures } from '../helpers';

chai.should();

describe('APIToken Model', () => {
  describe('.generate', () => {
    it('should generate a random token', () => {
      const body = {
        name: 'test'
      };

      return db.APIToken.generate(body).then(auth => {
        auth.token.length.should.equal(32);
        Object.keys(body).forEach(field => {
          auth.get(field).should.equal(body[field]);
        });
      });
    });

    it('should throw validation errors', done => {
      const body = {};

      db.APIToken.generate(body).catch(err => {
        err.message.should.equal(
          'notNull Violation: APIToken.name cannot be null'
        );
        done();
      });
    });
  });
});
