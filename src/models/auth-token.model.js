import { randomBytes } from 'crypto';

export default function(sequelize, DataTypes) {
    const AuthToken = sequelize.define('authToken', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        token: DataTypes.STRING,
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        classMethods: {
            associate(models) {
                AuthToken.belongsTo(models.System);
            },
            generate(body) {
                const token = randomBytes(16).toString('hex');
                return this.create({ ...body, token });
            }
        }
    });

    return AuthToken;
}
