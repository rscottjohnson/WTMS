<template>
  <div class="d-flex flex-column">
    <h1>Tasks</h1>
    <div class="mb-4">
      <router-link to="/tasks/new" class="btn btn-success ml-2" exact
        >Create Task</router-link
      >
    </div>
    <div v-if="tasks && tasks.length > 0" class="d-flex flex-wrap justify-content-start">
      <div v-for="task in tasks" v-bind:key="task._id" class="card mb-2 ml-2" style="width: 18rem;">
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <h5 class="card-title">{{ task.title }}</h5>
          </div>
          <h6 class="card-subtitle mb-2 text-muted">
            Created by: {{ task.author.username }}
          </h6>
          <h7><span v-bind:class="{ late: taskIsLate(task.dueDate) && !task.completed }" class="small">Due date: {{ task.dueDate | date }}</span></h7>
          <p class="card-text">
            {{ task.body }}
          </p>
          <div v-if="task.author._id === $store.state.userId" class="form-group form-check">
            <input type="checkbox" class="form-check-input" :disabled="task.completed" v-model="task.completed" v-on:click="markAsCompleted(task)"/>
            <label for="form-check-label">Completed</label>
          </div>
          <div v-if="task.author._id === $store.state.userId" class="d-flex justify-content-between">
            <router-link type="button" tag="button" class="card-link btn btn-primary" :to="{ name: 'tasks-edit', params: { id: task._id } }" exact>Edit</router-link>
            <a v-on:click.prevent="(currentTaskId = task._id)" class="card-link btn btn-danger" href="#" v-b-modal.modal1>Delete</a>
          </div>
          <div>
            
          </div>
        </div>
      </div>
      <div>
        <b-modal id="modal1" ref="modal" centered title="Confirm Delete">
          <p class="my-4">Are you sure?</p>
          <div slot="modal-footer" class="w-100 text-right">
            <b-button slot="md" class="mr-1" variant="danger" @click="deleteTask">Delete Task</b-button>
            <b-button slot="md" variant="secondary" @click="cancelModal">Cancel</b-button>
          </div>
        </b-modal>
      </div>
    </div>
    <div v-if="tasks && tasks.length === 0" class="ml-2">
      <div class="alert alert-info">
        There are no tasks to display.
      </div>
    </div>
  </div>
</template>

<script>
import * as taskService from "../../services/TaskService";
import moment from 'moment';

export default {
  name: "tasks-all",
  // data function to map task values
  data: function() {
    return {
      tasks: null,
      currentTaskId: null,
    };
  },
  beforeRouteEnter(to, from, next) {
    // server call to get all tasks
    taskService.getAllTasks().then((res) => {
      next((vm) => {
        vm.tasks = res.data.tasks;
      });
    });
  },
  methods: {
    // takes in the date of the task
    taskIsLate: function(date) {
      // is date passed before the current date
      return moment(date).isBefore();
    },
    cancelModal: function() {
      this.$refs.modal.hide();
      // clear the current task id
      this.currentTaskId = null;
    },
    deleteTask: async function() {
      this.$refs.modal.hide();
      await taskService.deleteTask(this.currentTaskId);
      // obtain the index of the task
      const index = this.tasks.findIndex(task => task._id === this.currentTaskId);
      // remove the task from the array
      this.tasks.splice(index, 1);
      // clear the task id
      this.currentTaskId = null;
    },
    markAsCompleted: function(task) {
      // mark the task as completed before sending to the server
      task.completed = true;
      // create the request object and pass in a task
      const request = {
        task: task
      }
      taskService.updateTask(request);
    }
  }
};
</script>
