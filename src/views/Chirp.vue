<template>
  <div class="divide-y divide-gray-500">
    <FeedChirp
      v-if="chirp"
      :chirp="chirp"
      @liked="toggleLike($event, chirp)"
      @rechirped="toggleRechirp($event, chirp)"
    />
  </div>
</template>

<script setup>
import { inject, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const axios = inject("axios");
const chirp = ref(null)

axios.get(`chirp/${route.params.chirpId}`).then(({ data }) => chirp.value = data).catch(err => alert(err))

function toggleLike(value) {
  chirp.value.liked = value;
  chirp.value.likes += value ? 1 : -1;
}

function toggleRechirp(value) {
  chirp.value.rechirped = value;
  chirp.value.rechirps += value ? 1 : -1;
}
</script>