export default function(sequelize, DataTypes) {
    const CustomerRole = sequelize.define('customerRole', {
        role: DataTypes.STRING,
        internalSales: DataTypes.BOOLEAN,
        isSeller: DataTypes.BOOLEAN
    }, {
        classMethods: {
            associate(models) {
                CustomerRole.belongsTo(models.System);
                CustomerRole.hasMany(models.Customer);
            }
        }
    });

    return CustomerRole;
}
