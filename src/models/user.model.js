import passportLocalSequelize from 'passport-local-sequelize';

export default function(sequelize, DataTypes) {
    const User = sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'user'
        },
        hash: DataTypes.STRING,
        salt: DataTypes.STRING
    }, {
        classMethods: {
            associate(models) {
                User.belongsToMany(models.System, {
                    through: models.SystemRole,
                    foreignKey: 'userId'
                });
            }
        }
    });

    passportLocalSequelize.attachToUser(User, {
        usernameField: 'email'
    });

    return User;
}
