<template>
  <div id="app">
    <Navbar />
    <div id="app-container">
      <router-view/>
    </div>
  </div>
</template>

<style>
@import './assets/css/style.css';
</style>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'app',
  components: {
    Navbar
  }
}
</script>
