<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top custom-bg-dark">
      <router-link to="/" class="navbar-brand">
        <img
          style="max-height:25px; padding-right:6px;"
          src="../assets/logo.png"
        />Web Task Management System
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link">
              Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/tasks" class="nav-link">
              Tasks
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link">
              Register
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link">
              Login
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Logout</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">UserName</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
