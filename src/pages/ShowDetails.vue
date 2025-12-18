<template>
  <div
    class="p-6 max-w-5xl mx-auto rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 text-black shadow-xl mt-8"
  >
  <button
  @click="goBack"
  class="mb-4 inline-flex items-center gap-2 px-4 py-2
         rounded-lg bg-gray-300 text-gray-800 font-medium
         hover:bg-gray-400 transition"
>
  ← Back
</button>
  <!-- Page Loader -->
    <Loader :show="isloading" v-if="isloading" title="Loading Show Details..." subTitle="This may take a few seconds, please wait to view the show details."/>
    <!-- Show details -->
    <div v-else class="flex flex-col md:flex-row items-start gap-8">
      
      <!-- Image of the show-->
      <div class="relative w-full md:w-80 h-64 md:h-[420px] group">
        <img
          v-if="show.image?.original"
          :src="show.image.original"
          :alt="show.name"
          class="w-full h-full object-cover rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div v-else class="w-full h-full bg-gray-400 animate-pulse rounded-2xl"></div>
      </div>

      <!-- Details -->
      <div class="flex-1 w-full text-left space-y-4">
        <!-- Title -->
        <h1 class="text-4xl font-extrabold tracking-tight">
          {{ show.name }}
        </h1>

        <!-- Rating -->
        <div class="flex items-center gap-2">
          <span
            class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold"
          >
          <!-- Star Icon svg for rating -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 flex-shrink-0"
            >
              <path
                d="M12 2l2.94 6.63L22 9.24l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.11 2 9.24l7.06-.61L12 2z"
              />
            </svg>
            <!-- Display average rating or 'No Rating' if not available -->
             {{ show.rating?.average ?? 'No Rating' }}
          </span>
        </div>

        <!-- show status and language info -->
        <div class="flex flex-wrap gap-4 text-sm text-gray-700">
          <p><strong>Status:</strong> {{ show?.status }}</p>
          <p><strong>Language:</strong> {{ show.language }}</p>
        </div>

        <!-- Genres -->
        <div class="flex flex-wrap gap-2">
          <span
            v-for="genre in show.genres"
            :key="genre"
            class="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium"
          >
            {{ genre }}
          </span>
        </div>

        <!-- Summary -->
        <div
          class="mt-4 text-sm leading-relaxed text-gray-800 border-l-4 border-teal-400 pl-4"
          v-html="show.summary"
        ></div>
      </div>
    </div>

  </div>
</template>


<script setup lang="ts">
import { ref, onMounted,computed, onBeforeMount } from 'vue'
import Loader from '../components/Loader.vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
import { useTvMazeStore } from '../stores/tvmaze'
const tvmazeStore = useTvMazeStore()

//to navigate back to the previous page
const goBack = () => {
  router.back()
}

//computed property to get show details from the store
const show = computed(()=> tvmazeStore.showbyID)

//loading state
const isloading = ref<boolean>(false)

onBeforeMount(async () => {
  isloading.value = true
  // api call to fetch show details by its id
  await tvmazeStore.get_tvShows(route.params.id)
  isloading.value = false

})
</script>