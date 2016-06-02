import Bluebird from 'bluebird';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import jwt from 'jsonwebtoken';
import config from '../config';
import { sendInvite, sendReset } from '../components/mail';
Bluebird.promisifyAll(bcrypt);

export default function(sequelize, DataTypes) {
    const User = sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        name: DataTypes.STRING,
        hash: DataTypes.STRING
    }, {
        classMethods: {
            associate(models) {
                User.belongsToMany(models.System, {
                    through: models.SystemRole,
                    foreignKey: 'userId'
                });
            },
            register(body, password) {
                return bcrypt.genSaltAsync()
                .then(salt => bcrypt.hashAsync(password, salt))
                .then(hash => User.create({
                    ...body,
                    hash
                }));
            },
            invite(body) {
                return User.create({
                    ...body
                })
                .then(user => user.sendInvite());
            }
        },
        instanceMethods: {
            authenticate(password) {
                return bcrypt.compareAsync(password, this.hash);
            },
            sendInvite() {
                const cleanUser = _.omit(this, 'hash');
                const userObject = cleanUser.toJSON();
                const token = jwt.sign({ ...userObject, invite: true }, config.jwtSecret, {
                    expiresIn: '1h',
                    subject: String(this.id)
                });
                return sendInvite(cleanUser, token);
            },
            passwordReset() {
                const cleanUser = _.omit(this, 'hash');
                const userObject = cleanUser.toJSON();
                const token = jwt.sign({ ...userObject, reset: true }, config.jwtSecret, {
                    expiresIn: '1h',
                    subject: String(this.id)
                });
                return sendReset(cleanUser, token);
            },
            updatePassword(password) {
                return bcrypt.genSaltAsync()
                    .then(salt => bcrypt.hashAsync(password, salt))
                    .then(hash => {
                        this.hash = hash;
                        return this.save();
                    });
            }
        }
    });

    return User;
}
