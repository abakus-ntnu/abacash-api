export default function(sequelize, DataTypes) {
    const Customer = sequelize.define('customer', {
        rfid: DataTypes.STRING,
        displayName: DataTypes.STRING,
        username: DataTypes.STRING,
        balance: DataTypes.DECIMAL(2)
    }, {
        classMethods: {
            associate(models) {
                Customer.hasMany(models.Transaction);
                Customer.belongsTo(models.System);
                Customer.belongsTo(models.CustomerRole);
            }
        }
    });

    return Customer;
}
