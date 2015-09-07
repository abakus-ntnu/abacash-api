/**
 * Error responses
 */

'use strict';

module.exports[404] = function pageNotFound(req, res) {
  res.status(404).json({
    status: 404,
    message: 'Page Not Found'
  });
};
