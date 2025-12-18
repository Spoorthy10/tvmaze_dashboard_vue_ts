<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import NavBar from './components/NavBar.vue'
  import Footer from './components/Footer.vue'

</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!--to get the navigation bar for all the pages-->
    <NavBar />
    <main class="flex-1 pt-10">
      <!--to render the routed components-->
      <RouterView />
    </main>
    <!--to get the footer for all the pages-->
    <Footer />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
