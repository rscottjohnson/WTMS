'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;
exports.create = create;
exports.update = update;
exports.remove = remove;
exports.show = show;

var _userModel = require('../../model/user-model');

var _userModel2 = _interopRequireDefault(_userModel);

var _taskModel = require('../../model/task-model');

var _taskModel2 = _interopRequireDefault(_taskModel);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function index(req, res) {
  // find all tasks
  return res.status(200).json();
}

function create(req, res) {
  // create task
  var id = 10; // fake id to save with the user
  // find the user by the id, an error or the user will be returned
  _userModel2.default.findOne({ _id: id }, function (error, user) {
    // if error is returned or user isn't found
    if (error && !user) {
      return res.status(500).json();
    }
    // constant for task
    // pass in the task object from the request
    var task = new _taskModel2.default()(req.body.task);
    // tie the task to the user
    task.author = user._id;
    // format the due date
    task.dueDate = (0, _moment2.default)(task.dueDate);
    // save the task to the database
    task.save(function (error) {
      if (error) {
        return res.status(500).json();
      }
      return res.status(201).json();
    });
  });

  return res.status(201).json();
}

function update(req, res) {
  // update task
  return res.status(204).json();
}

function remove(req, res) {
  // delete task
  return res.status(204).json();
}

function show(req, res) {
  // get task by id
  return res.status(200).json();
}