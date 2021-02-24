import User from '../../model/user-model';
import Task from '../../model/task-model';
import moment from 'moment';

export function index(req, res) {
  // find all tasks
  return res.status(200).json();
}

export function create(req, res) {
  // create task
  const id = 10; // fake id to save with the user
  // find the user by the id, an error or the user will be returned
  User.findOne({ _id: id }, (error, user) => {
    // if error is returned or user isn't found
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
      return res.status(201).json();
    })

  }); 
  
  return res.status(201).json();
}

export function update(req, res) {
  // update task
  return res.status(204).json();
}

export function remove(req, res) {
  // delete task
  return res.status(204).json();
}

export function show(req, res) {
  // get task by id
  return res.status(200).json();
}