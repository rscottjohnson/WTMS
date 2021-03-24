<template>
  <div>
    <h1>Edit Task</h1>
    <form class="custom-form" v-on:submit.prevent="onSubmit">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          v-model="task.title"
          name="title"
          type="text"
          class="form-control"
          id="title"
          placeholder="Title"
        />
      </div>
      <div class="form-group">
        <label for="body">Body</label>
        <textarea v-model="task.body" name="body" class="form-control" id="body" cols="30" rows="10" placeholder="Body"></textarea>
      </div>
      <div class="form-group">
        <label for="due-date">Due Date</label>
        <input
          v-model="task.dueDate"
          name="due-date"
          type="date"
          class="form-control"
          id="due-date"
          placeholder="Due Date"
        />
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-secondary">Update Task</button>
      </div>
    </form>
  </div>
</template>

<script>
  import * as taskService from '../../services/TaskService'
  import moment from 'moment'

  export default {
    name: 'tasks-edit',
    data: function() {
      return {
        task: {
          title: '',
          body: '',
          dueDate: ''
        }
      }
    },
    // need to grab the task that the user is trying to edit
    beforeRouteEnter(to, from, next) {
      taskService.getTaskById(to.params.id)
      .then(response => {
        if (!response) {
          // redirect to tasks page if invalid
          next('tasks');
        } else {
          next(vm => {
            // save to a constant in order to format
            const task = response.data.task;
            // format with moment
            task.dueDate = moment(task.dueDate)
            .format('YYYY-MM-DD');
            // assign task to vm
            vm.task = task;
          })
        }
      });
    },
    methods: {
      onSubmit: async function() {
        const request = {
          task: this.task
        }
        await taskService.updateTask(request);
        // route back to the tasks-all page
        this.$router.push({ name: 'tasks-all' });
      }
    }

  }
</script>
