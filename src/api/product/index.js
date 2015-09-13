'use strict';

var express = require('express');
var controller = require('./product.controller');
var connection = require('../../components/connection.factory.js');

var router = express.Router();

router.get('/:system', connection.tenantMiddleware(), controller.active);
router.post('/:system', connection.tenantMiddleware(), controller.create);
router.get('/:system/all', connection.tenantMiddleware(), controller.index);
router.get('/:system/:id', connection.tenantMiddleware(), controller.show);
router.put('/:system/:id', connection.tenantMiddleware(), controller.update);
router.delete('/:system/:id', connection.tenantMiddleware(), controller.destroy);
router.get('/:system/type/:type', connection.tenantMiddleware(), controller.type);

module.exports = router;
