export default function(sequelize, DataTypes) {
    const Customer = sequelize.define('customer', {
        rfid: {
         type: DataTypes.STRING,
         allowNull: false   
        },
        displayName: {
         type: DataTypes.STRING,
         allowNull: false   
        },
        username: DataTypes.STRING,
        balance: DataTypes.DECIMAL
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
