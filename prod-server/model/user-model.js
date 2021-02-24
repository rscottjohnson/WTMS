'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _stringUtil = require('../utilities/string-util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Define the user schema
var userSchema = new _mongoose2.default.Schema({
  username: String,
  firstname: String,
  lastname: String,
  password: String
});
userSchema.set('timestamps', true);
userSchema.virtual('fullName').get(function () {
  var firstname = _stringUtil.StringUtil.capitalize(this.firstname.toLowerCase());
  var lastname = _stringUtil.StringUtil.capitalize(this.lastname.toLowerCase());
  return firstname + ' ' + lastname;
});
// pre-save method runs before saving a user to the database
// setting user, first, and last name to lowercase for consistency
userSchema.pre('save', function (next) {
  this.username = this.username.toLowerCase();
  this.firstname = this.firstname.toLowerCase();
  this.lastname = this.lastname.toLowerCase();
  next(); // continue saving the user
});

exports.default = _mongoose2.default.model('user', userSchema);