import chai from 'chai';
import request from 'supertest';
import Bluebird from 'bluebird';
import app from '../../src/app';
import db from '../../src/models';
import { loadFixtures } from '../helpers';

chai.should();

function postTransaction(transaction, expectedSum) {
    return new Bluebird((resolve, reject) => {
        request(app)
        .post('/api/1/transactions/')
        .send(transaction)
        .expect(201)
        .end((err, res) => {
              if (err) return reject(err);
              // check sum
              res.body.total.should.equal(expectedSum);
              resolve(res.body.id);
        });
    });
}

function getTransaction(transactionId) {
      // check if the transaction can be fetched 
      return new Bluebird((resolve, reject) => {
          request(app)
          .get('/api/1/transactions/' + transactionId)
          .expect(200)
          .end((err, res) => {
                if (err) return reject(err);
                // transaction exists
                res.body.id.should.equal(transactionId); 
                resolve();
          });
      });
}

function checkCustomerBalance(customerId, expectedBalance) {
      // check if customer has new balance
      return new Bluebird((resolve, reject) => {
          request(app)
          .get('/api/1/customers/' + customerId)
          .expect(200)
          .end((err, res) => {
                if (err) return reject(err);
                res.body.balance.should.equal(expectedBalance);
                resolve();
          });
      });
}

function checkProductStock(productId, expectedStock) {
      return new Bluebird((resolve, reject) => {
          request(app)
          .get('/api/1/products/' + productId)
          .expect(200)
          .end((err, res) => {
                if (err) return reject(err);
                res.body.stock.should.equal(expectedStock);
                resolve();
          });
      });
}

describe('Transaction API', () => {
    
    const fixtures = [
        'systems.json',
        'integration/transaction.json'
    ];


    beforeEach(() => loadFixtures(fixtures));
    
    it('should properly add a transaction for a non-internal user', () => {

        const transaction = {
            sellerId: 1,
            customerId: 3,
            products: [1, 2, 2]
        };

        const expectedSum = 90.0;
        const expectedBalance = 59.5;
        const expectedProduct1Stock = 4;
        const expectedProduct2Stock = 6;
        
        // add the transaction
        return postTransaction(transaction, expectedSum)
        .then(getTransaction)
        .then(() => checkCustomerBalance(transaction.customerId, expectedBalance))
        .then(() => checkProductStock(1, expectedProduct1Stock))
        .then(() => checkProductStock(2, expectedProduct2Stock));
    });

    it('should properly add a transaction for an internal user', () => {
        const transaction = {
            sellerId: 1,
            customerId: 2,
            products: [1, 2, 2]
        };

        const expectedSum = 70.98;
        const expectedBalance = 29.02;
        const expectedProduct1Stock = 4;
        const expectedProduct2Stock = 6;
        
        // add the transaction
        return postTransaction(transaction, expectedSum)
        .then(getTransaction)
        .then(() => checkCustomerBalance(transaction.customerId, expectedBalance))
        .then(() => checkProductStock(1, expectedProduct1Stock))
        .then(() => checkProductStock(2, expectedProduct2Stock));

    });

});
