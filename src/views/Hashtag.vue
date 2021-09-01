<template>
  <h3 class="italic px-4 text-2xl">#{{ hashtag }}</h3>
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
import { ref, computed, watch, inject } from 'vue'
import { useRoute } from 'vue-router'
const axios = inject("axios");

const chirps = ref(null)

const route = useRoute()
const hashtag = computed(() => route.params.hashtag)

async function getChirps() {
  const { data } = await axios.get(`chirps/hashtag/${hashtag.value}`);
  chirps.value = data;
}

watch(hashtag, getChirps, { immediate: true })

function toggleLike(event, chirp) {
  chirp.liked = event;
  chirp.likes += event ? 1 : -1;
}

function toggleRechirp(event, chirp) {
  chirp.rechirped = event;
  chirp.rechirps += event ? 1 : -1;
}
</script>