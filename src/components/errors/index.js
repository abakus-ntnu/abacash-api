/**
 * Error responses
 */

'use strict';

var util = require('util');

function ValidationError(errors) {
    this.name = 'ValidationError';
    this.message = 'Validation failed.';
    this.status = 400;
    this.errors = errors;
    this.payload = {
        name: this.name,
        message: this.message,
        status: this.status,
        errors: this.errors
    };
}
util.inherits(ValidationError, Error);
exports.ValidationError = ValidationError;

function NotFoundError(type) {
    this.name = 'NotFoundError';
    this.message = 'Couldn\'t find ' + type + '.';
    this.status = 404;
}
util.inherits(NotFoundError, Error);
exports.NotFoundError = NotFoundError;

exports.errorMiddleware = function(err, req, res, next) {
    var status = err.status || 500;

    return res
        .status(status)
        .json(err.payload || {
            name: err.name,
            status: status,
            message: err.message
        });
};

exports[404] = function pageNotFound(req, res) {
  res.status(404).json({
    status: 404,
    message: 'Page Not Found'
  });
};
