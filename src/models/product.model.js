export default function(sequelize, DataTypes) {
    const Product = sequelize.define('product', {
        type: DataTypes.STRING,
        price: DataTypes.DECIMAL(2),
        internalPrice: {
            type: DataTypes.DECIMAL(2),
            allowNull: true,
            get() {
                if (this.getDataValue('internalPrice') === null) {
                    return this.getDataValue('price');
                }

                return this.getDataValue('internalPrice');
            }
        },
        name: DataTypes.STRING,
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        stock: {
            type: DataTypes.INTEGER, defaultValue: 0
        }
    }, {
        classMethods: {
            associate(models) {
                Product.belongsTo(models.System);
                Product.belongsToMany(models.Transaction, { through: 'transactionProduct'});
            }
        }
    });

    return Product;
}
