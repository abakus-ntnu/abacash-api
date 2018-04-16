import config from '../config';

export default function(sequelize, DataTypes) {
  const CustomerRole = sequelize.define('customerRole', {
    role: {
      type: DataTypes.STRING,
      defaultValue: 'customer'
    },
    internalSales: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isSeller: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isDefaultRole: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    allowCredit: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  });

  CustomerRole.associate = function(models) {
    CustomerRole.hasMany(models.Customer);
  };

  return CustomerRole;
}
