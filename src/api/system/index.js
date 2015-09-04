'use strict';

var express = require('express');
var controller = require('./system.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.get('/use/:id', controller.use);
router.post('/role', controller.createRole);
router.post('/type', controller.createType);
router.put('/role/:role', controller.updateRole);
router.delete('/role/:role', controller.deleteRole);
router.delete('/type/:type', controller.deleteType);

module.exports = router;