<template>
  <div>
    <form class="custom-form" v-on:submit.prevent="onSubmit">
    <h1>WTMS User Registration</h1>
    <br>
      <div class="form-group">
        <label for="firstname">First Name</label>
        <input
          v-model="firstname"
          type="text"
          class="form-control"
          id="firstname"
          placeholder="First Name"
        />
      </div>
      <div class="form-group">
        <label for="lastname">Last Name</label>
        <input
          v-model="lastname"
          type="text"
          class="form-control"
          id="lastname"
          placeholder="Last Name"
        />
      </div>
      <div class="form-group">
        <label for="username">Username</label>
        <input
          v-model="username"
          type="text"
          class="form-control"
          id="username"
          placeholder="Username"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
        />
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-secondary">Register</button>
      </div>
    </form>
  </div>
</template>

<script>
  import * as auth from '../../services/AuthService'

  export default {
    name: 'register', data: function() {
      return {
        username: '',
        password: '',
        firstname: '',
        lastname: ''
      }
    },
    methods: {
      onSubmit: async function() {
        const user = {
          username: this.username,
          password: this.password,
          firstname: this.firstname,
          lastname: this.lastname
        }
        const registerPromise = auth.registerUser(user);
        const loginPromise = auth.login(user);
        await Promise.all([registerPromise, loginPromise]);
        this.$router.push({ name: 'Home' });
      }
    }
  }
</script>
