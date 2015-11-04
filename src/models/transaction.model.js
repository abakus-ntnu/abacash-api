export default function(sequelize, DataTypes) {
    const Transaction = sequelize.define('transaction', {
        total: DataTypes.DECIMAL,
        customerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sellerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        classMethods: {
            associate(models) {
                Transaction.belongsToMany(models.Product, { 
                    through: 'transactionProduct' 
                });
                Transaction.belongsTo(models.Customer, {
                    as: 'customer',
                    foreignKey: 'customerId'
                });
                Transaction.belongsTo(models.Customer, { 
                    as: 'seller', 
                    foreignKey: 'sellerId' 
                });
                Transaction.belongsTo(models.System);
            }
        }
    });

    return Transaction;
}
