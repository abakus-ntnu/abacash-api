'use strict';

var express = require('express');
var controller = require('./transaction.controller');
var connection = require('../../components/connection.factory.js');

var router = express.Router();

router.get('/', connection.tenantMiddleware(), controller.index);
router.post('/', connection.tenantMiddleware(), controller.create);
router.get('/:id', connection.tenantMiddleware(), controller.show);
//router.get('/period', connection.tenantMiddleware(), controller.showPeriod);
//router.get('/user/:id', connection.tenantMiddleware(), controller.showCustomer);

module.exports = router;