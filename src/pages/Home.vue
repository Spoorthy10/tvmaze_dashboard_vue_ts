<template>
  <div class="p-8">
    <!-- Page Loader -->
    <Loader :show="isloading" v-if="isloading" title="Loading TV Shows..." subTitle="This may take a few seconds, please wait to view the shows."/>

    <div v-else>
      <!--Search field, search and clear button-->
      <div class="flex flex-col md:flex-row gap-3 mb-6">
        <!-- Search Input Field -->
        <input
          v-model="search_show_name"
          type="text"
          placeholder="Search TV shows..."
          class="w-full md:flex-1 p-2 rounded-lg bg-gray-200 text-black" @keydown.enter="searchShow"
          @keydown.esc="clearFilters"
        />
        <!--Search and Clear Buttons-->
        <div class="flex gap-2 w-full md:w-auto">
          <button
            class="w-full md:w-auto px-4 py-2 bg-blue-600 text-gray-300 rounded-lg font-medium hover:bg-gray-200 disabled:opacity-70"
          >
            Search
          </button>

          <button
            class="w-full md:w-auto px-4 py-2 bg-gray-500 text-gray-800 rounded-lg font-medium hover:bg-red-500"
          >
            Clear
          </button>
        </div>
      </div>
      <!--when filters is not applied-->
      <div v-if="searched_tvshow?.length == 0">
          <div
            v-for="(shows, genre) in showsByGenre"
            :key="genre"
            class="mb-5 bg-gray-200 p-3 sm:p-4 rounded-xl"
          >
          <!--Genre Title-->
            <h2 class="text-lg sm:text-xl font-bold mb-4 text-teal-500 text-left">
              {{ genre }}
            </h2>

            <div
              class="flex flex-nowrap gap-4 overflow-x-auto pb-2"
            >
            <!--Tv Show Cards of the Genre-->
              <ShowCards
                v-for="show in shows"
                :key="show.id"
                :show="show"
                @click="goToShow(show.id)"
              />
            </div>
          </div>
      </div>

      <!-- When filter is applied -->
      <div v-else class="mb-8 bg-gray-200 p-3 rounded-xl">
        <!--heading when user searches for a show-->
          <h2 class="text-xl font-bold mb-4 text-teal-600 capitalize text-start">
            Shows you searched for
          </h2>
          <!--displaying the searched tv shows-->
          <div class="flex flex-nowrap gap-4 overflow-x-auto pb-2">
            <ShowCards
              v-for="show in searched_tvshow"
              :key="show.show.id"
              :show="show.show"
              @click="goToShow(show.show.id)"
            />
          </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, computed,ref } from 'vue'
import Loader from '../components/Loader.vue'
import ShowCards from '../components/ShowCards.vue'
import { useTvMazeStore } from '../stores/tvmaze'
const tvmazeStore = useTvMazeStore()
import { useRouter } from 'vue-router'
const router = useRouter()
const isloading = ref<Boolean>(false)

//to filter the tv shows
const search_show_name = ref<string>('')
const searched_tvshow = computed(()=> tvmazeStore.searched_tvshow)
const searchShow=async()=>{
  isloading.value = true
    let searchdata = ''
    if(search_show_name.value!=''){
        searchdata+="q=" +search_show_name.value
        await tvmazeStore.get_tvShow_onSearch(searchdata)
    }
  isloading.value = false
}
//

//to clear the applied filters
const clearFilters=async()=>{
  isloading.value = true
    search_show_name.value = ''
    tvmazeStore.searched_tvshow = []
    await tvmazeStore.get_tvShows()
  isloading.value = false
}
//

//to navigate to the particular show information
const goToShow = (id:number) => {
  router.push(`/show/${id}`)
}
//

//tvshows computed value
const showsByGenre = computed(() => tvmazeStore.showsByGenre)
//

onBeforeMount(async() => {
  isloading.value = true
  //to fetch the tv shows
  await tvmazeStore.get_tvShows()
  isloading.value = false
})
</script>