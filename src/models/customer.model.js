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
        balance: {
            type: DataTypes.DECIMAL,
            get() {
                return Math.round(Number(this.getDataValue('balance')) * 100) / 100.0;
            }
        }
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
