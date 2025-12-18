<template>
  <div
    class="shrink-0 cursor-pointer transform transition-all duration-300
           hover:scale-[1.02] hover:shadow-lg active:scale-95 rounded-lg
           w-full h-full"
    role="button"
    tabindex="0"
    @keydown.enter="$emit('click')"
    @keydown.space="$emit('click')"
  >
    <!-- Display Show Image -->
    <div class="relative w-full pb-[140%] sm:pb-[137.5%] md:pb-[133.33%] overflow-hidden rounded-lg">
      <img
        :src="show.image?.medium"
        :alt="show.name || 'TV show poster'"
        class="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
    </div>

    <!-- Display Show Name -->
    <p class="font-semibold text-sm sm:text-base mt-2 sm:mt-3 truncate px-1">
      {{ show.name }}
    </p>

    <!-- Display Rating -->
    <p class="text-xs sm:text-sm flex gap-1 items-center px-1">
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
      <span class="truncate">{{ show.rating?.average ?? 'No Rating' }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
//props defined : show - Object containing details of a TV show 
defineProps({
  show: {
    type: Object,
    required: true
  }
})
</script>
