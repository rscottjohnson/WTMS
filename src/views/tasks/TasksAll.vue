<template>
  <div class="d-flex flex-column">
    <h1>Tasks</h1>
    <div class="mb-4">
      <router-link to="/tasks/new" class="btn btn-success ml-2" exact
        >Create Task</router-link
      >
    </div>
    <div
      v-if="tasks && tasks.length > 0"
      class="d-flex flex-wrap justify-content-start"
    >
      <div
        v-for="task in tasks"
        v-bind:key="task._id"
        class="card mb-2 ml-2"
        style="width: 18rem;"
      >
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <h5 class="card-title">{{ task.title }}</h5>
            <span>{{ task.dueDate }}</span>
          </div>
          <h6 class="card-subtitle mb-2 text-muted">
            Created by {{ task.author.username }}
          </h6>
          <p class="card-text">
            {{ task.body }}
          </p>
          <div
            v-if="task.author._id === $store.state.userId"
            class="form-group form-check"
          >
            <input
              type="checkbox"
              class="form-check-input"
              :disabled="task.completed"
              v-model="task.completed"
              v-on:click="markAsCompleted(task)"
            />
            <label for="form-check-label">Completed</label>
          </div>
          <div
            v-if="task.author._id === $store.state.userId"
            class="d-flex justify-content-between"
          >
            <router-link
              type="button"
              tag="button"
              class="card-link btn btn-primary"
              :to="{ name: 'tasks-edit', params: { id: task._id } }"
              exact
              >Edit</router-link
            >
            <a
              v-click.prevent="(currentTaskId = task._id)"
              class="card-link btn btn-danger"
              href="#"
              v-b-modal.modal1
              >Delete</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as taskService from "../../services/TaskService";

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
};
</script>
