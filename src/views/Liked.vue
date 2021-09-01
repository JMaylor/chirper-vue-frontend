<template>
  <div class="divide-y divide-gray-500">
    <FeedChirp
      v-for="chirp in chirps"
      :key="chirp.chirp_id"
      :chirp="chirp"
      @liked="toggleLike($event, chirp)"
      @rechirped="toggleRechirp($event, chirp)"
    />
  </div>
</template>

<script setup>
import { inject, ref, onMounted } from 'vue'
const axios = inject("axios");
const chirps = ref([])

async function getLikedChirps() {
  const { data } = await axios.get("chirps/liked");
  chirps.value = data;
}
onMounted(getLikedChirps)

function toggleLike(event, chirp) {
  chirp.liked = event;
  chirp.likes += event ? 1 : -1;
};
function toggleRechirp(event, chirp) {
  chirp.rechirped = event;
  chirp.rechirps += event ? 1 : -1;
};

</script>