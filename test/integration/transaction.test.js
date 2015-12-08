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

function postTransactionInsufficientBalance(transaction) {
    return new Bluebird((resolve, reject) => {
        request(app)
        .post('/api/1/transactions/')
        .send(transaction)
         .expect(400)
         .end((err, res) => {
               if (err) return reject(err);
               resolve();
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

function getTransactionInsufficientBalance(transactionId) {
      // check if the transaction can be fetched 
      return new Bluebird((resolve, reject) => {
          request(app)
          .get('/api/1/transactions/' + transactionId)
          .expect(404)
          .end((err, res) => {
                if (err) return reject(err);
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
    
    it('should properly add a transaction for a non-internal customer', () => {

        const transaction = {
            sellerId: 1,
            customerId: 3,
            products: [1, 2, 2]
        };
        
        return postTransaction(transaction, 90.0)
        .then(getTransaction)
        .then(() => checkCustomerBalance(transaction.customerId, 59.5))
        .then(() => checkProductStock(1, 4))
        .then(() => checkProductStock(2, 6));
    });

    it('should properly add a transaction for an internal customer', () => {
        const transaction = {
            sellerId: 1,
            customerId: 2,
            products: [1, 2, 2]
        };
        return postTransaction(transaction, 70.98)
        .then(getTransaction)
        .then(() => checkCustomerBalance(transaction.customerId, 29.02))
        .then(() => checkProductStock(1, 4))
        .then(() => checkProductStock(2, 6));


    });

    xit('should not add a transaction if the customer does not have enough money', () => {
        const transaction = {
            sellerId: 1,
            customerId: 3,
            products: [1, 2, 2, 1, 2, 2, 1]
        };

        // add the transaction
        return postTransactionInsufficientBalance(transaction)
        .then(getTransactionInsufficientBalance);
        /*
        .then((transactionId) => getTransaction(transactionId, true));
        .then(() => checkCustomerBalance(transaction.customerId, expectedBalance))
        .then(() => checkProductStock(1, expectedProduct1Stock))
        .then(() => checkProductStock(2, expectedProduct2Stock));
        */

    });

});
