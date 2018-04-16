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
  });

  User.register = function(body, password) {
    return bcrypt
      .genSaltAsync()
      .then(salt => bcrypt.hashAsync(password, salt))
      .then(hash =>
        User.create({
          ...body,
          hash
        })
      );
  };

  User.invite = function(body) {
    let userInstance;
    return User.create(body)
      .then(user => {
        userInstance = user;
        return user.sendInvite();
      })
      .then(() => userInstance);
  };

  User.prototype.authenticate = function(password) {
    return bcrypt.compareAsync(password, this.hash);
  };

  User.prototype.toJSON = function() {
    const values = this.get({ plain: true });
    return _.omit(values, 'hash');
  };

  User.prototype.sendInvite = function() {
    const token = createToken({ ...this.toJSON(), invite: true }, '5h');
    return sendInviteEmail(this, token);
  };

  User.prototype.passwordReset = function() {
    const token = createToken({ ...this.toJSON(), reset: true }, '5h');
    return sendResetEmail(this, token);
  };

  User.prototype.updatePassword = function(password) {
    return bcrypt
      .genSaltAsync()
      .then(salt => bcrypt.hashAsync(password, salt))
      .then(hash => {
        this.hash = hash;
        return this.save();
      });
  };

  return User;
}
