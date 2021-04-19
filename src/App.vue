<template>
  <div id="app">
    <Navbar />
    <div id="app-container">
      <router-view/>
    </div>
    <Footer />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
@import './assets/css/style.css';
</style>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'app',
  components: {
    Navbar,
    Footer
  },
  beforeCreate: function() {
    this.$store.dispatch('authenticate');
  }
}
</script>
