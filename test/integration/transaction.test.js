import chai from 'chai';
import request from 'supertest';
import Bluebird from 'bluebird';
import app from '../../src/app';
import db from '../../src/models';
import { loadFixtures } from '../helpers';

const should = chai.should();

// posts a transaction that should work and check if sum is calculated correctly
function postTransactionAndCheckSum(transaction, expectedSum) {
    return new Bluebird((resolve, reject) => {
        request(app)
        .post('/1/transactions/')
        .send(transaction)
        .expect(201)
        .end((err, res) => {
              if (err) return reject(err);
              res.body.total.should.equal(expectedSum);
              resolve(res.body.id);
        });
    });
}

// see if transaction is added and can be fetched from the API
function checkIfTransactionExists(transactionId) {
    return new Bluebird((resolve, reject) => {
        request(app)
        .get('/1/transactions/' + transactionId)
        .expect(200)
        .end((err, res) => {
            if (err) return reject(err);
            res.body.id.should.equal(transactionId); 
            resolve();
        });
    });
}

// posts a transaction where the user has insufficient balance
function postTransactionInsufficientBalance(transaction) {
    return new Bluebird((resolve, reject) => {
        request(app)
        .post('/1/transactions/')
        .send(transaction)
        .expect(400) // 400 status code on insufficient balance
        .end((err, res) => {
            if (err) return reject(err);
            resolve();
         });
    });
}


function checkIfNoTransactionsAreAdded(transactionId) {
    // check if the transaction can be fetched 
    return new Bluebird((resolve, reject) => {
        request(app)
        .get('/1/transactions/')
        .expect(200)
        .end((err, res) => {
            if (err) return reject(err);
            res.body.length.should.equal(0);
            resolve();
        });
    });
}

function checkCustomerBalance(customerId, expectedBalance) {
    // check if customer has new balance
    return new Bluebird((resolve, reject) => {
        request(app)
        .get('/1/customers/' + customerId)
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
        .get('/1/products/' + productId)
        .expect(200)
        .end((err, res) => {
              should.equal(expectedStock, res.body.stock);
              resolve();
        });
    });
}

describe('Transaction API Integration', () => {
    
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
        
        return postTransactionAndCheckSum(transaction, 90.0)
        .then(checkIfTransactionExists)
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

        return postTransactionAndCheckSum(transaction, 70.98)
        .then(checkIfTransactionExists)
        .then(() => checkCustomerBalance(transaction.customerId, 29.02))
        .then(() => checkProductStock(1, 4))
        .then(() => checkProductStock(2, 6));

    });

    it('should not add a transaction if the customer does not have enough money', () => {

        const transaction = {
            sellerId: 1,
            customerId: 3,
            products: [1, 2, 2, 1, 2, 2, 1]
        };

        // add the transaction
        return postTransactionInsufficientBalance(transaction)
        .then(checkIfNoTransactionsAreAdded)
        .then(() => checkCustomerBalance(transaction.customerId, 149.5))
        .then(() => checkProductStock(1, 5))
        .then(() => checkProductStock(2, 8));
    });

    it('should allow a user with allowCredit role to get negative balance', () => {

        const transaction = {
            sellerId: 1,
            customerId: 2,
            products: [1, 1, 1, 1, 1, 1, 1]
        };

        // add the transaction
        return postTransactionAndCheckSum(transaction, 105.00)
        .then(checkIfTransactionExists)
        .then(() => checkCustomerBalance(transaction.customerId, -5.0))
        .then(() => checkProductStock(1, -2));
    });

    it('should not decrease stock if keepStock is false', () => {

        const transaction = {
            sellerId: 1,
            customerId: 3,
            products: [3]
        };
        
        return postTransactionAndCheckSum(transaction, 10.0)
        .then(() => checkProductStock(3, 8));

    });

    it('should handle situations where stock is null', () => {

        const transaction = {
            sellerId: 1,
            customerId: 3,
            products: [4]
        };
        
        return postTransactionAndCheckSum(transaction, 10.0)
        .then(() => checkProductStock(4, null));

    });

});
