export default function(sequelize, DataTypes) {
    const CustomerRole = sequelize.define('customerRole', {
        role: DataTypes.STRING,
        internalSales: DataTypes.BOOLEAN,
        isSeller: DataTypes.BOOLEAN
    }, {
        classMethods: {
            associate(models) {
                CustomerRole.hasMany(models.Customer);
            }
        }
    });

    return CustomerRole;
}
