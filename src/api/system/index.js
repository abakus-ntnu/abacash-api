'use strict';

var express = require('express');
var controller = require('./system.controller');
var connection = require('../../components/connection.factory.js');
var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.get('/connect/:system', controller.connect);
router.get('/:id', controller.show);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.post('/role/:id', controller.createRole);
router.post('/type/:id', controller.createType);
router.put('/role/:id/:system', connection.tenantMiddleware() ,controller.updateRole);
router.put('/type/:id', controller.updateType);
router.delete('/role/:role/:id', controller.deleteRole);
router.delete('/type/:id', controller.deleteType);

module.exports = router;
