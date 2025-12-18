<template>
  <!-- NavBar Component -->
  <nav class="fixed top-0 left-0 w-full z-50 bg-gray-900 text-white shadow-md">
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div
        class="text-2xl font-bold tracking-wide cursor-pointer"
        @click="goHome"
      >
        <span class="text-teal-500"> TV</span>Maze
      </div>

    </div>

  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

// Navigate to Home Page when clicked on the logo
const goHome = () => {
  router.push('/')
}
</script>
