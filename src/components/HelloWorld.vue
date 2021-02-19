<template>
  <div class="jumbotron">
    <h1 class="display-4">Web Task Management System</h1>
    <p class="lead">
      A web application that a team of developers can utilize to create, edit, track the completion of, and delete tasks as part of a workgroup.  WTMS utilizes MongoDB, ExpressJS, VueJS, and NodeJS.
    </p>
    <hr class="my-4" />
    <p>
      Click below to begin using WTMS and managing user tasks.
    </p>
    <router-link class="btn btn-success btn-lg" to="/tasks">
      View Tasks
    </router-link>
  </div>
</template>

// <script>
// export default {
//   name: "HelloWorld",
//   props: {
//     msg: String,
//   },
// };
// </script>