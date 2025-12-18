<template>
<!--when the api is triggered to fetch data, this loader component will be displayed-->
    <div v-if="show"
      class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-300 opacity-75 flex flex-col items-center justify-center">
      <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-600 h-12 w-12 mb-4"></div>
      <h2 class="text-center text-black text-xl font-semibold">{{title}}</h2>
      <p class="w-1/3 text-center text-black">{{subTitle}}</p>
    </div>
</template>

<script setup lang="ts">
//show - Boolean to show or hide the loader component
//title - String to show the title message while loading
//subTitle - String to show the subtitle message while loading
defineProps({
  show: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: 'Loading...'
  },
  subTitle: {
    type: String,
    default: 'This may take a few seconds, please wait.'
  }
})
</script>