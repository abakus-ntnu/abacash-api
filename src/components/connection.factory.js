import compose from 'composable-middleware';
import config from '../config/environment';
import async from 'async';
import System from '../api/system/system.model';
import mongoose from 'mongoose';

var connections = {};

var models = [
	'../api/product/product.model.js',
	'../api/customer/customer.model.js',
	'../api/role/role.model.js'
];

function init() {
	System.find({}, 'name')
		.exec()
		.map(system => {
			console.log('hei', system.name, config.mongo.host);
			const connection = mongoose.createConnection(config.mongo.host + system.name);
			return addModels(system, connection);
		});
}

function addModels(system, connection) {
	models.forEach(model => require(model)(connection));
	connections[system.id] = connection;
}

// Middleware that finds the right tenant, based on cookies from the user
exports.tenantMiddleware = function() {
	return compose()
	.use(function(req, res, next) {
		if (connections[req.params.system]) {
			req.connection = connections[req.params.system];
		}

		next();
	});
};

//A System has been created, we need to append it to the tenant connections
exports.createSystem = function(system) {
	addModels(system, mongoose.createConnection(config.mongo.host + system.name));
};

//A System is deleted we need to remove it from the tenant connections
exports.deleteConnection = function() {

};

// Function that connects to all the tenant databases at startup
init();
