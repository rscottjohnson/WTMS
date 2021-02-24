import User from '../../model/user-model';
import Task from '../../model/task-model';
import moment from 'moment';

export function index(req, res) {
  // find (read) all tasks
  // find all the tasks (empty curly braces), an error or the tasks will be returned
  Task.find({}, (error, tasks) => {
    // if error is returned
    if (error) {
      return res.status(500).json();
    }
    // return all the tasks
    return res.status(200).json({ tasks: tasks });
    // grab other properties from the user model
  }).populate('author', 'username', 'user');
}

export function create(req, res) {
  // create task
  const id = 10; // fake id to save with the user
  // find the user by the id, an error or the user will be returned
  User.findOne({ _id: id }, (error, user) => {
    // if error is returned or user isn't found, return the error
    if (error && !user) { 
      return res.status(500).json();
    }
    // constant for task
    // pass in the task object from the request
    const task = new Task()(req.body.task);
    // tie the task to the user
    task.author = user._id;
    // format the due date
    task.dueDate = moment(task.dueDate);
    // save the task to the database
    task.save(error => {
      if (error) {
        return res.status(500).json();
      }
      return res.status(204).json();
    });
  });
}

export function update(req, res) {
  // update task
  const id = 10; // fake id to save with the user
  // find the task by the id, an error or the user will be returned
  User.findOne({ _id: id }, (error, user) => {
    // if error is returned or user isn't found, return the error
    if (error) {
      return res.status(500).json();
    }
    // if we don't have a user, return the error
    if (!user) {
      return res.status(404).json();
    }

    // constant for the task to be updated
    const task = req.body.task;
    // update the author and due date
    task.author = user._id;
    task.dueDate = moment(task.dueDate);
    // pass in the id of the task, return error if error
    Task.findByIdAndUpdate({ _id: task._id }, task, error => {
      if (error) {
        return res.status(500).json();
      }
      return res.status(204).json();
    });
  });
}

export function remove(req, res) {
  // delete task
  
  return res.status(204).json();
}

export function show(req, res) {
  // get task by id
  // find the task by the id, an error or the task will be returned
  Task.findOne({ _id: req.params.id }, (error, task) => {
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