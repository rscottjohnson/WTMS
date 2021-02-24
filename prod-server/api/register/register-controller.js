'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;

var _stringUtil = require('../../utilities/string-util');

var _userModel = require('../../model/user-model');

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function index(req, res) {
  var validation = validateIndex(req.body);
  if (!validation.isValid) {
    return res.status(400).json({ message: validation.message });
  }
  var user = new _userModel2.default({
    username: req.body.username.toLowerCase(),
    password: req.body.password
  });
  user.save(function (error) {
    if (error) {
      // if the error code is 11000 (mongoose: username taken), return error
      if (error.code === 11000) {
        return res.status(403).json({ message: 'Username is already taken' });
      }
      return res.status(500).json();
    }
    return res.status(201).json();
  });
}

function validateIndex(body) {
  var errors = '';
  if (_stringUtil.StringUtil.isEmpty(body.username)) {
    errors += 'Username is required. ';
  }
  if (_stringUtil.StringUtil.isEmpty(body.password)) {
    errors += 'Password is required. ';
  }

  return {
    isValid: _stringUtil.StringUtil.isEmpty(errors),
    message: errors
  };
}