'use strict';

var express = require('express');
var controller = require('./system.controller');
var connection = require('../../components/connection.factory.js');
var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.put('/:system', controller.update);
router.get('/:system', connection.tenantMiddleware(), controller.show);
router.post('/:system/roles', connection.tenantMiddleware(), controller.createRole);

module.exports = router;
