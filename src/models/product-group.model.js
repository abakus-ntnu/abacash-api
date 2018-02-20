export default function(sequelize, DataTypes) {
  const ProductGroup = sequelize.define(
    'productGroup',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      classMethods: {
        associate(models) {
          ProductGroup.hasMany(models.Product);
        }
      }
    }
  );

  return ProductGroup;
}
