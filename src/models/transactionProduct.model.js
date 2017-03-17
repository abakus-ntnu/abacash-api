import db from '.';
import analytics from '../components/stats';

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
    })

    .then(() => {
        if (product && customer && transaction) {
            return analytics.track({
                userId: customer.id,
                event: 'product_sale',
                properties: {
                    systemId: product.systemId,
                    username: customer.username,
                    displayName: customer.displayName,
                    sellerId: transaction.sellerId,
                    transactionId: transaction.id,
                    productId: product.id,
                    name: product.name,
                    type: product.type,
                    count: Number(transactionProduct.count)
                },
                context: {
                    app: 'abacash'
                }
            });
        }
    });
};

export default function(sequelize, DataTypes) {
    return sequelize.define('transactionProduct', {
        count: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        hooks: {
            afterCreate: transactionProduct => trackProductUsage(transactionProduct),
            afterBulkCreate: transactionProducts =>
                transactionProducts.map(transactionProduct => trackProductUsage(transactionProduct))
        }
    });
}
