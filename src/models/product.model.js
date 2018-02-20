export default function(sequelize, DataTypes) {
  const Product = sequelize.define('product', {
    price: {
      type: DataTypes.DECIMAL,
      get() {
        return Number(this.getDataValue('price'));
      }
    },
    internalPrice: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      get() {
        if (!this.getDataValue('internalPrice')) {
          return Number(this.getDataValue('price'));
        }
        return Number(this.getDataValue('internalPrice'));
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    keepStock: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  Product.associate = function(models) {
    Product.belongsTo(models.ProductGroup);
    Product.belongsToMany(models.Transaction, {
      through: models.TransactionProduct
    });
  };

  return Product;
}
