import db from '.';

const trackProductUsage = transactionProduct => {
  let product = null;
  let customer = null;
  let transaction = null;

  db.Product.findOne({
    where: {
      id: transactionProduct.productId
    }
  })
    .then(result => {
      product = result;
      return result;
    })
    .then(() =>
      db.Transaction.findOne({
        where: {
          id: transactionProduct.transactionId
        }
      })
    )
    .then(result => {
      if (result) {
        transaction = result;
        return result;
      }
      return Promise.resolve();
    })
    .then(() => transaction.getCustomer())
    .then(result => {
      customer = result;
      return result;
    });
};

export default function(sequelize, DataTypes) {
  return sequelize.define('transactionProduct', {
    count: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
}
