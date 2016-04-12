// imports
import db from '../src/models';
import { MongoClient } from 'mongodb';
import program from 'commander';
import Bluebird from 'bluebird';
import _ from 'lodash';




program
  .version('0.0.1')
  .option('-d, --database [value]', 'MongoDB connection string (i.e. mongodb://localhost:27017/labamba')
  .option('-s, --system-id <n>', 'System ID to transfer to')
  .option('-k, --keep-stock', 'Keep stock?')
  .parse(process.argv);

function clearPostgresDB(systemId) {
    return Bluebird.all([
        db.CustomerRole.destroy({ where : { systemId } }),
        db.Customer.destroy({ where : { systemId } }),
        db.Product.destroy({ where : { systemId } }),
        db.Transaction.destroy({ where : { systemId } })
    ]);
}

function loadProducts(mongoDb, systemId, keepStock) {
  return Bluebird.resolve(mongoDb.collection('products').find().toArray())
    .map(product => { 
        product.internalPrice = product.internalPrice;
        product.keepStock = keepStock;
        product.stock = 0;
        product.systemId = systemId;
        return product;
    })
    .map(product => _.pick(product, [
        'type', 
        'price', 
        'internalPrice',
        'name', 
        'active',
        'keepStock',
        'systemId'
    ]))
    .map(product => db.Product.create(product));
}

function loadUsers(mongoDb, systemId) {
  // user level cannot be less than 1 or more than 4
  // user level 2 and 3 has discount
  // user level 3 and 4 are sellers
  let customerLevelIds = {};
  return Bluebird.all([
      db.CustomerRole.create({
          role: 'Vanlig bruker',
          internalSales: false,
          isSeller: false,
          isDefaultRole: true,
          allowCredit: false,
          systemId: systemId
      })
      .then(role => {
        customerLevelIds[1] = role.id;
      }),
      db.CustomerRole.create({
          role: 'Rabattert bruker',
          internalSales: true,
          isSeller: false,
          isDefaultRole: false,
          allowCredit: true,
          systemId: systemId
      })
      .then(role => {
        customerLevelIds[2] = role.id;
      }),
      db.CustomerRole.create({
          role: 'Rabattert selger',
          internalSales: true,
          isSeller: true,
          isDefaultRole: false,
          allowCredit: true,
          systemId: systemId
      })
      .then(role => {
        customerLevelIds[3] = role.id;
      }),
      db.CustomerRole.create({
          role: 'Selger',
          internalSales: false,
          isSeller: true,
          isDefaultRole: false,
          allowCredit: false,
          systemId: systemId
      })
      .then(role => {
        customerLevelIds[4] = role.id;
      })
  ])
  .then(() => Bluebird.resolve(mongoDb.collection('users').find().toArray()))
  .map(customer => { 
      customer.displayName = customer.displayname;
      customer.systemId = systemId;
      customer.customerRoleId = customerLevelIds[customer.accesslevel];
      return customer;
  })
  .map(customer => _.pick(customer, [
      'displayName', 
      'username', 
      'balance',
      'rfid',
      'systemId', 
      'customerRoleId',
  ]))
  .map(customer => db.Customer.create(customer));
}

let mongoDb;

clearPostgresDB(program.systemId)
  .then(() => MongoClient.connect(program.database))
  .then(db => {
      mongoDb = db;
  })
  .then(() => loadProducts(mongoDb, program.systemId, program.keepStock || false))
  .then(() => loadUsers(mongoDb, program.systemId))
  .then(() => process.exit(0))
  .catch(err => {
      console.log(err);
      process.exit(1);
  });

/*
MongoClient.connect(program.database)
  .then((db) => {
      console.log('Successfully connected to database!');

      fixProducts(db)
        .then(
      const products = db.collection('products');
      return (products.find().toArray();
  })
  .then((products) => {
    console.dir(products);
    return true;
  })
  .catch(() => {
      console.log(err);
  });

*/
