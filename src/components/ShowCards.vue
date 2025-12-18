<template>
  <div
    class="shrink-0 cursor-pointer transform transition duration-300
           hover:scale-105 hover:shadow-xl rounded-lg
           w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] xl:w-[220px]"
  >
  <!--Display Show Image-->
    <img
      :src="show.image?.medium"
      class="rounded w-full h-[200px] sm:h-[220px] md:h-[240px] object-cover"
      alt=""
    />

  <!--Display Show Name-->
    <p class="font-semibold text-sm sm:text-base mt-1 truncate">
      {{ show.name }}
    </p>

  <!--Display Rating of the show along with rating icon(star)-->
    <p class="text-xs sm:text-sm flex gap-1 items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400"
      >
        <path
          d="M12 2l2.94 6.63L22 9.24l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.11 2 9.24l7.06-.61L12 2z"
        />
      </svg>
      {{ show.rating?.average ?? 'No Rating' }}
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
