"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;
exports.create = create;
exports.update = update;
exports.remove = remove;
exports.show = show;
function index(req, res) {
  // find all tasks
  return res.status(200).json();
}

function create(req, res) {
  // create task
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