'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }

  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'abacash-secret'
  },

  domain: 'Abacash',

  // api keys for AWS
  aws: {
    smtp:
    {
     accessKeyId: 'AKIAJ6EWUHYLCYAECHOA',
     secretAccessKey: '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',
     username: 'SES_SMTP_SONNICO',
     region: 'eu-west-1'
    }
  },

  // List of user roles
  userRoles: ['user', 'moderator', 'admin'],
  customerRoles: ['customer', 'seller', 'internal', 'admin'],

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});
