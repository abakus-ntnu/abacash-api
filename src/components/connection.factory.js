var compose = require('composable-middleware');
var config = require('../config/environment');
var async = require('async');
var System = require('../api/system/system.model');
var mongoose = require('mongoose');

var connections = {};

function init(){
	System.find({},'name', function (err, systems) {
		async.each(systems, function (system, callback) { 
			addModels(system, mongoose.createConnection(config.mongo.host+system.name));
		});
	});
}

function addModels(system, connection){
	require('../api/product/product.model.js')(connection);
	require('../api/customer/customer.model.js')(connection);
	connections[system.name] = {
		'connection': connection,
		'_id': system._id
	} 
}

// Middleware that finds the right tenant, based on cookies from the user
exports.tenantMiddleware = function() {  
	return compose()
	.use(function(req, res, next) {
		if(connections[req.params.system]){
			req.connection = connections[req.params.system].connection;
			next()
		}else{
			next()
		}	  
	});
};

//A System has been created, we need to append it to the tenant connections
exports.createSystem = function(system) {  
	addModels(system, mongoose.createConnection(config.mongo.host+system.name));
};

//A System is deleted we need to remove it from the tenant connections
exports.deleteConnection = function() {  
	
};

// Function that connects to all the tenant databases at startup
init();

