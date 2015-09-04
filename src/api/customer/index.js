'use strict';

var express = require('express');
var controller = require('./customer.controller');
var connection = require('../../components/connection.factory.js');


var router = express.Router();

router.get('/', connection.tenantMiddleware(), controller.index);
router.post('/', connection.tenantMiddleware(), controller.create);
router.get('/:id', connection.tenantMiddleware(), controller.show);
router.put('/:id', connection.tenantMiddleware(), controller.update);
router.delete('/:id', connection.tenantMiddleware(), controller.destroy);
router.get('/role/:role', connection.tenantMiddleware(), controller.role);

module.exports = router;