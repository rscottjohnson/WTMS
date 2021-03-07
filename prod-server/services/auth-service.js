'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateJWT = generateJWT;
exports.requireLogin = requireLogin;
exports.decodeToken = decodeToken;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// function to take in the user object
function generateJWT(user) {
  var tokenData = { username: user.username, id: user._id };
  // create the token
  return _jsonwebtoken2.default.sign({ user: tokenData }, process.env.TOKEN_SECRET);
}

// Require login for any routes that the user needs to be logged in to access
function requireLogin(req, res, next) {
  var token = decodeToken(req);
  // If there is no token, then return an error letting the user know they must login
  if (!token) {
    return res.status(401).json({ message: 'You must be logged in.' });
  }
  // Otherwise, we know we have a valid token and the user is logged in
  next();
}

// Decrypt the token
function decodeToken(req) {
  // Obtain the token from the headers
  var token = req.headers.authorization || req.headers['authorization'];

  // If there is no token, return null, otherwise decrypt the token
  if (!token) {
    return null;
  }

  try {
    return _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET);
  } catch (error) {
    return null;
  }
}