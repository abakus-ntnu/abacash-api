/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  app.use('/auth', require('./auth'));

  // Insert routes below
  app.use('/api/users', require('./api/user'));
  app.use('/api/systems', require('./api/system'));

  // There routes have a connectionManager middleware that changes the system database based on a cookie token.
  app.use('/api/products', require('./api/product'));
  app.use('/api/transactions', require('./api/transaction'));
  app.use('/api/customers', require('./api/customer'));
  app.use('/api/auth', require('./api/authToken'));
  

  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
