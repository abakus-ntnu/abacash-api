export default function(sequelize, DataTypes) {
  const Customer = sequelize.define(
    'customer',
    {
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
      balance: {
        type: DataTypes.DECIMAL,
        get() {
          return Math.round(Number(this.getDataValue('balance')) * 100) / 100.0;
        }
      }
    },
    {
      classMethods: {
        associate(models) {
          Customer.hasMany(models.Transaction);
          Customer.belongsTo(models.CustomerRole);
        }
      }
    }
  );

  return Customer;
}
