export default function(sequelize, DataTypes) {
    const System = sequelize.define('system', {
        displayName: DataTypes.STRING,
        name: DataTypes.STRING,
        info: DataTypes.STRING,
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            lowercase: true
        },
        productTypes: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: ['Innskudd'],
            lowercase: true
        },
        needSeller: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
        },
        internalSales: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        allowCredit: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    }, {
        classMethods: {
            associate(models) {
                System.hasMany(models.Customer);
                System.hasMany(models.CustomerRole);
                System.hasMany(models.AuthToken);
                System.hasMany(models.Product);
                System.hasMany(models.Transaction);
                System.belongsToMany(models.User, {
                    through: models.SystemRole,
                    foreignKey: 'systemId'
                });
            }
        }
    });

    return System;
}
