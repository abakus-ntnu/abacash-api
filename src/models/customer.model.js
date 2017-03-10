import analytics from '../components/stats';

export default function(sequelize, DataTypes) {
    const Customer = sequelize.define('customer', {
        rfid: {
            type: DataTypes.STRING,
            unique: 'customers_rfid_unique'
        },
        displayName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true,
            set(value) {
                if (value) {
                    this.setDataValue('username', value.toLowerCase());
                }
            }
        },
        systemId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: 'customers_rfid_unique'
        },
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
        },
        hooks: {
            afterUpdate: customer => analytics.track({
                userId: customer.id,
                event: 'balance',
                properties: {
                    username: customer.username,
                    displayName: customer.displayName,
                    systemId: customer.systemId,
                    balance: Number(customer.balance)
                },
                context: {
                    app: 'abacash'
                }
            })
        }
    });

    return Customer;
}
