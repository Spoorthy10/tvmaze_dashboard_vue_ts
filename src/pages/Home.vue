<template>
  <div class="p-4 sm:p-6 lg:p-8">
    <!-- Page Loader -->
    <Loader 
      v-if="isloading" 
      :show="isloading" 
      title="Loading TV Shows..." 
      subTitle="This may take a few seconds, please wait to view the shows."
    />

    <div v-else>
      <!-- Search Section -->
      <div class="flex flex-col sm:flex-row gap-3 mb-6">
        <!-- Search Input Field -->
        <input
          v-model="search_show_name"
          type="text"
          placeholder="Search TV shows..."
          class="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          @keydown.enter="searchShow"
          @keydown.esc="clearFilters"
        />
        
        <!-- Search and Clear Buttons Container -->
        <div class="flex gap-2 w-full sm:w-auto">
          <button
            @click="searchShow"
            class="w-full sm:w-auto px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex-1 sm:flex-none"
            :disabled="!search_show_name.trim()"
          >
            Search
          </button>

          <button
            @click="clearFilters"
            class="w-full sm:w-auto px-4 py-3 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-500 active:bg-gray-400 dark:active:bg-gray-400 transition-all duration-200 flex-1 sm:flex-none"
          >
            Clear
          </button>
        </div>
      </div>

      <!-- When filters is not applied -->
      <div v-if="searched_tvshow?.length === 0">
        <div
          v-for="(shows, genre) in showsByGenre"
          :key="genre"
          class="mb-6 bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm"
        >
          <!-- Genre Title -->
          <h2 class="text-lg sm:text-xl lg:text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400 text-start">
            {{ genre }}
          </h2>

          <!-- TV Show Cards Container -->
          <div class="flex gap-3 sm:gap-4 overflow-x-auto pb-4 px-1 -mx-1">
            <div 
              v-for="show in shows" 
              :key="show.id"
              class="flex-none"
              :style="{ width: cardWidth }"
            >
              <ShowCards
                :show="show"
                @click="goToShow(show.id)"
                class="hover:shadow-lg transition-shadow duration-200"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- When filter is applied -->
      <div v-else class="mb-8 bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm">
        <!-- Search Results Heading -->
        <h2 class="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-teal-600 dark:text-teal-400 capitalize">
          Shows you searched for
        </h2>
        
        <!-- Displaying the searched TV shows -->
        <div 
          v-if="searched_tvshow?.length > 0"
          class="flex gap-3 sm:gap-4 overflow-x-auto pb-4 px-1 -mx-1"
        >
          <div 
            v-for="(result, index) in searched_tvshow" 
            :key="result.show.id"
            class="flex-none"
            :style="{ width: cardWidth }"
          >
            <ShowCards
              :show="result.show"
              @click="goToShow(result.show.id)"
              class="hover:shadow-lg transition-shadow duration-200"
            />
          </div>
        </div>
        
        <!-- No Results Message -->
        <div v-else class="text-center py-8 text-gray-600 dark:text-gray-400">
          <p class="text-lg">No shows found for "{{ search_show_name }}"</p>
          <button 
            @click="clearFilters"
            class="mt-4 px-4 py-2 text-sm bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
          >
            Clear Search
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, computed, ref, onMounted, onUnmounted } from 'vue'
import Loader from '../components/Loader.vue'
import ShowCards from '../components/ShowCards.vue'
import { useTvMazeStore } from '../stores/tvmaze'
import { useRouter } from 'vue-router'

const tvmazeStore = useTvMazeStore()
const router = useRouter()
const isloading = ref<boolean>(false)

// Responsive card width state
const cardWidth = ref('200px')
const screenWidth = ref(window.innerWidth)

// Update card width based on screen size
const updateCardWidth = () => {
  screenWidth.value = window.innerWidth
  if (screenWidth.value < 640) {
    cardWidth.value = '140px' // Mobile
  } else if (screenWidth.value < 768) {
    cardWidth.value = '160px' // Small tablets
  } else if (screenWidth.value < 1024) {
    cardWidth.value = '180px' // Tablets
  } else if (screenWidth.value < 1280) {
    cardWidth.value = '200px' // Laptops
  } else {
    cardWidth.value = '220px' // Large screens
  }
}

// Search functionality
const search_show_name = ref<string>('')
const searched_tvshow = computed(() => tvmazeStore.searched_tvshow)

const searchShow = async () => {
  if (!search_show_name.value.trim()) return
  
  isloading.value = true
  try {
    const searchdata = "q=" + encodeURIComponent(search_show_name.value.trim())
    await tvmazeStore.get_tvShow_onSearch(searchdata)
  } catch (error) {
    console.error('Search failed:', error)
  } finally {
    isloading.value = false
  }
}

// Clear filters
const clearFilters = async () => {
  isloading.value = true
  try {
    search_show_name.value = ''
    tvmazeStore.searched_tvshow = []
    await tvmazeStore.get_tvShows()
  } catch (error) {
    console.error('Clear filters failed:', error)
  } finally {
    isloading.value = false
  }
}

// Navigation
const goToShow = (id: number) => {
  router.push(`/show/${id}`)
}

// Computed properties
const showsByGenre = computed(() => tvmazeStore.showsByGenre)

// Lifecycle hooks
onMounted(() => {
  updateCardWidth()
  window.addEventListener('resize', updateCardWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateCardWidth)
})

onBeforeMount(async () => {
  isloading.value = true
  try {
    await tvmazeStore.get_tvShows()
  } catch (error) {
    console.error('Failed to load TV shows:', error)
  } finally {
    isloading.value = false
  }
})
</script>

<style scoped>
/* Custom scrollbar for better UX */
::-webkit-scrollbar {
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Dark mode scrollbar */
@media (prefers-color-scheme: dark) {
  ::-webkit-scrollbar-track {
    background: #374151;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #6b7280;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
}

/* Prevent layout shift during loading */
.flex-none {
  flex-shrink: 0;
}
</style>