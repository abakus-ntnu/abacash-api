import db from '.';
import analytics from '../components/stats';

const trackProductUsage = transactionProduct => {
    db.Product.findOne({
        where: {
            id: transactionProduct.productId
        }
    })
    .then(product => {
        if (product) {
            return analytics.track({
                anonymousId: 'system',
                event: 'product_sale',
                properties: {
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
