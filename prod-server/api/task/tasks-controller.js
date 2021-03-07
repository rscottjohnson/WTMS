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

var _authService = require('../../services/auth-service');

var auth = _interopRequireWildcard(_authService);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function index(req, res) {
  // find (read) all tasks
  // find all the tasks (empty curly braces), an error or the tasks will be returned
  _taskModel2.default.find({}, function (error, tasks) {
    // if error is returned
    if (error) {
      return res.status(500).json();
    }
    // return all the tasks
    return res.status(200).json({ tasks: tasks });
    // grab other properties from the user model
  }).populate('author', 'username', 'user');
}

function create(req, res) {
  // create task
  var id = auth.getUserId(req);
  // find the user by the id, an error or the user will be returned
  _userModel2.default.findOne({ _id: id }, function (error, user) {
    // if error is returned or user isn't found, return the error
    if (error && !user) {
      return res.status(500).json();
    }
    // constant for task
    // pass in the task object from the request
    var task = new _taskModel2.default(req.body.task);
    // tie the task to the user
    task.author = user._id;
    // format the due date
    task.dueDate = (0, _moment2.default)(task.dueDate);
    // save the task to the database
    task.save(function (error) {
      if (error) {
        return res.status(500).json();
      }
      return res.status(204).json();
    });
  });
}

function update(req, res) {
  // update task
  var id = auth.getUserId(req);
  // find the task by the id, an error or the user will be returned
  _userModel2.default.findOne({ _id: id }, function (error, user) {
    // if error is returned or user isn't found, return the error
    if (error) {
      return res.status(500).json();
    }
    // if we don't have a user, return the error
    if (!user) {
      return res.status(404).json();
    }

    // constant for the task to be updated
    var task = new _taskModel2.default(req.body.task);
    // update the author and due date
    task.author = user._id;
    task.dueDate = (0, _moment2.default)(task.dueDate);
    // pass in the id of the task, return error if error
    _taskModel2.default.findByIdAndUpdate({ _id: task._id }, task, function (error) {
      if (error) {
        return res.status(500).json();
      }
      return res.status(204).json();
    });
  });
}

function remove(req, res) {
  // delete task
  var id = auth.getUserId(req);
  // find the task by the id, an error or the task will be returned
  _taskModel2.default.findOne({ _id: req.params.id }, function (error, task) {
    // if error is returned, return the error
    if (error) {
      return res.status(500).json();
    }
    // if task isn't found, return the error
    if (!task) {
      return res.status(404).json();
    }
    // compare the author id to the id of the user trying to remove the task
    // if it's not a match, then return an error
    if (task.author._id.toString() !== id) {
      return res.status(403).json({ message: 'Not allowed to delete another user\'s task' });
    }
    // if a match, delete the task
    _taskModel2.default.deleteOne({ _id: req.params.id }, function (error) {
      // if error, return the error
      if (error) {
        return res.status(500).json();
      }
      return res.status(204).json();
    });
  });
}

function show(req, res) {
  // get task by id
  // find the task by the id, an error or the task will be returned
  _taskModel2.default.findOne({ _id: req.params.id }, function (error, task) {
    // if error is returned, return the error
    if (error) {
      return res.status(500).json();
    }
    // or if the task isn't found, also return an error
    if (!task) {
      return res.status(404).json();
    }
    // otherwise, return the task
    return res.status(200).json({ task: task });
  });
}