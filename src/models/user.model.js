import Bluebird from 'bluebird';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import { createToken } from '../auth';
import { sendInviteEmail, sendResetEmail } from '../components/mail';
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
                return User.create(body)
                .then(user => user.sendInvite());
            }
        },
        instanceMethods: {
            authenticate(password) {
                return bcrypt.compareAsync(password, this.hash);
            },
            toJSON() {
                const values = this.get();
                return _.omit(values, 'hash');
            },
            sendInvite() {
                const token = createToken({ ...this.toJSON(), invite: true }, '1h');
                return sendInviteEmail(this, token);
            },
            passwordReset() {
                const token = createToken({ ...this.toJSON(), reset: true }, '1h');
                return sendResetEmail(this, token);
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
