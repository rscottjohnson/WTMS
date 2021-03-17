import { http } from './HttpService'

// function for getting all tasks
export function getAllTasks() {
  return http().get('/task');
}

// function for getting a task by its id
export function getTaskById(id) {
  return http().get(`/task/${id}`);
}

// function for creating a task
export function createTask(task) {
  return http().post('/task'), task);
}

// function for deleting a task
export function deleteTask(id) {
  return http().delete(`/task/${id}`);
}

// function for updating a task
export function updateTask(task) {
  return http().put('/task', task);
}