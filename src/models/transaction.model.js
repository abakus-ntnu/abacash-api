export default function(sequelize, DataTypes) {
    const Transaction = sequelize.define('transaction', {
        name: DataTypes.STRING,
        info: DataTypes.STRING,
        active: DataTypes.BOOLEAN,
        total: DataTypes.DECIMAL(2)
    }, {
        classMethods: {
            associate(models) {
                Transaction.belongsToMany(models.Product, { through: 'transactionProduction' });
                Transaction.belongsTo(models.Customer, { as: 'customer', foreignKey: 'customerId' });
                Transaction.belongsTo(models.Customer, { as: 'seller', foreignKey: 'sellerId' });
            }
        }
    });

    return Transaction;
}
