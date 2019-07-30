const jwt = require('jsonwebtoken');
const config = require('../config');

const withAuth = function(req, res, next) {
    const token = req.headers.token;
    if (!token) {
      res.status(401).send('Unauthorized: No token provided');
    } else {
      jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
          res.status(401).send('Unauthorized: Invalid token');
        } else {
          req.id = decoded.id;
          next();
        }
      });
    }
  }
  module.exports = withAuth;