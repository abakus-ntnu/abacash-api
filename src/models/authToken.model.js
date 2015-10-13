export default function(sequelize, DataTypes) {
    const AuthToken = sequelize.define('authToken', {
        name: DataTypes.STRING,
        token: DataTypes.STRING,
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        classMethods: {
            associate(models) {
                AuthToken.belongsTo(models.System);
            }
        }
    });

    return AuthToken;
}
