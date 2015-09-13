'use strict';

var express = require('express');
var controller = require('./role.controller');
var router = express.Router();

router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
