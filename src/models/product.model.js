export default function(sequelize, DataTypes) {
    const Product = sequelize.define('product', {
        type: DataTypes.STRING,
        price: DataTypes.DECIMAL,
        internalPrice: {
            type: DataTypes.DECIMAL,
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
                Product.belongsTo(models.System, {
                    foreignKey: { 
                        allowNull: false
                    }
                });
                Product.belongsToMany(models.Transaction, { through: 'transactionProduct'});
            }
        }
    });

    return Product;
}
