import chai from 'chai';
import request from 'supertest';
import Bluebird from 'bluebird';
import app from '../../src/app';
import db from '../../src/models';
import { syncDB } from '../../src/model-helpers';
import sequelizeFixtures from 'sequelize-fixtures';
Bluebird.promisifyAll(request);
//import { loadFixtures, test404 } from '../helpers';


chai.should();




describe('Transaction API', () => {

    beforeEach(() => {
        return syncDB({ force: true })
        .then(() => sequelizeFixtures.loadFile('./test/fixtures/systems.json', db))
        .then(() => {
            return db.Product.bulkCreate([{
                id: 1,
                name: 'Product 1',
                type: 'Foo',
                price: 20.0,
                internalPrice: 15.0,
                active: true,
                stock: 5,
                keepStock: true,
                systemId: 1
            }, {
                id: 2,
                name: 'Product 2',
                type: 'Foo',
                price: 35.0,
                internalPrice: 27.99,
                active: true,
                stock: 8,
                keepStock: true,
                systemId: 1
            }]);
        })
        .then(() => {
            return db.CustomerRole.bulkCreate([{
                role: 'Seller',
                internalSales: false,
                isSeller: true,
                systemId: 1
            }, {
                role: 'Internal',
                internalSales: true,
                isSeller: false,
                systemId: 1
            }, {
                role: 'External',
                internalSales: false,
                isSeller: false,
                systemId: 1
            }]);
        })
        .then(() => {
            return db.Customer.bulkCreate([{
                rfid: '1234',
                displayName: 'Seller',
                username: 'seller',
                balance: 0.0,
                systemId: 1,
                customerRole: 1
            }, {
                rfid: '1234',
                displayName: 'Internal',
                username: 'internal',
                balance: 100.0,
                systemId: 1,
                customerRole: 2
            }, {
                rfid: '1234',
                displayName: 'External',
                username: 'external',
                balance: 149.5,
                systemId: 1,
                customerRole: 3
            }]);
        });
    });
    
    it('should properly add a transaction for a non-internal user', () => {
        const transaction = {
            sellerId: 1,
            customerId: 3,
            products: [1, 2, 2]
        };

        const sum = 90.0;
        // add the transaction
        return new Bluebird((resolve, reject) => {
            request(app)
            .post('/api/1/transactions/')
            .send(transaction)
            .expect(201)
            .end((err, res) => {
                  if (err) return reject(err);
                  // check sum
                  res.body.total.should.equal(sum);
                  resolve(res.body.id);
            });
        }).then((transactionId) => {
            // check if the transaction can be fetched 
            return new Bluebird((resolve, reject) => {
                request(app)
                .get('/api/1/transactions/' + transactionId)
                .expect(200)
                .end((err, res) => {
                      if (err) return reject(err);
                      // sum still correct
                      res.body.total.should.equal(sum);
                      resolve();
                });
            });
        }).then(() => {
            // check if customer has new balance
            return new Bluebird((resolve, reject) => {
                request(app)
                .get('/api/1/customers/' + transaction.customerId)
                .expect(200)
                .end((err, res) => {
                      if (err) return reject(err);
                      res.body.balance.should.equal(59.5);
                      resolve();
                });
            });
        }).then(() => {
            // check if product 1 has new stock
            return new Bluebird((resolve, reject) => {
                request(app)
                .get('/api/1/products/1')
                .expect(200)
                .end((err, res) => {
                      if (err) return reject(err);
                      res.body.stock.should.equal(4);
                      resolve();
                });
            });
        }).then(() => {
            // check if product 2 has new stock
            return new Bluebird((resolve, reject) => {
                request(app)
                .get('/api/1/products/2')
                .expect(200)
                .end((err, res) => {
                      if (err) return reject(err);
                      res.body.stock.should.equal(6);
                      resolve();
                });
            });
        });
    });


});
