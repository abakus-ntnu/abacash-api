/**
 * Main routerlication routes
 */

'use strict';

import express from 'express';
import errors from './components/errors';
import connection from './components/connection.factory.js';

var router = express.Router();

router.use('/auth', require('./auth'));
router.use('/api/auth', require('./api/authToken'));

router.use('/api/users', require('./api/user'));
router.use('/api/systems', require('./api/system'));

// There routes have a connectionManager middleware that changes the system database based on a cookie token.
router.param('system', connection.tenantMiddleware());
router.use('/api/:system/roles', require('./api/role'));
router.use('/api/:system/products', require('./api/product'));
router.use('/api/:system/transactions', require('./api/transaction'));
router.use('/api/:system/customers', require('./api/customer'));

router.use(errors[404]);
router.use(errors.errorMiddleware);

module.exports = router;
