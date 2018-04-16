export default function(sequelize, DataTypes) {
  const ProductGroup = sequelize.define('productGroup', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  ProductGroup.associate = function(models) {
    ProductGroup.hasMany(models.Product);
  };

  return ProductGroup;
}
