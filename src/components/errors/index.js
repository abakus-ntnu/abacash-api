/**
 * Error responses
 */

'use strict';

module.exports[404] = function pageNotFound(req, res) {
  res.status(result.status);
  res.json({
    status: 404,
    message: 'Page Not Found'
  });
};
