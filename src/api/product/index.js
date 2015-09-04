'use strict';

var express = require('express');
var controller = require('./product.controller');
var connection = require('../../components/connection.factory.js');

var router = express.Router();

router.get('/', connection.tenantMiddleware(), controller.active);
router.post('/', connection.tenantMiddleware(), controller.create);
router.get('/all', connection.tenantMiddleware(), controller.index);
router.get('/:id', connection.tenantMiddleware(), controller.show);
router.put('/:id', connection.tenantMiddleware(), controller.update);
router.delete('/:id', connection.tenantMiddleware(), controller.destroy);
router.get('/type/:type', connection.tenantMiddleware(), controller.type);

module.exports = router;