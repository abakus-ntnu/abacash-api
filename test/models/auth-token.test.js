import chai from 'chai';
import db from '../../src/models';
import { loadFixtures } from '../helpers';

chai.should();

describe('APIToken Model', () => {
    const fixtures = ['systems.json'];
    beforeEach(() => loadFixtures(fixtures));

    describe('.generate', () => {
        it('should generate a random token', () => {
            const body = {
                name: 'test',
                systemId: 1
            };

            return db.APIToken.generate(body)
            .then(auth => {
                auth.token.length.should.equal(32);
                Object.keys(body).forEach(field => {
                    auth.get(field).should.equal(body[field]);
                });
            });
        });

        it('should throw validation errors', done => {
            const body = {
                systemId: 1
            };

            return db.APIToken.generate(body)
            .catch(err => {
                err.message
                    .should.equal('notNull Violation: name cannot be null');
                done();
            });
        });
    });
});
