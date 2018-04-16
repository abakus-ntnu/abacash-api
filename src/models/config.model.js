export default function(sequelize, DataTypes) {
  const Config = sequelize.define('config', {
    needSeller: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true
    }
  });

  Config.associate = function(models) {
    Config.hasOne(models.CustomerRole, { as: 'defaultCustomerRole' });
  };

  return Config;
}
