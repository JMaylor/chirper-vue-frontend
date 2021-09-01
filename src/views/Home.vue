<template>
  <div class="divide-y divide-gray-500">
    <LoadingIcon v-if="loading" />
    <FeedChirp
      v-else
      v-for="chirp in chirps"
      :key="chirp.chirp_id"
      :chirp="chirp"
      @liked="toggleLike($event, chirp)"
      @rechirped="toggleRechirp($event, chirp)"
    />
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'

const loading = ref(false)
const chirps = ref([])

async function loadChirps() {
  loading.value = true
  try {
    const axios = inject('axios')
    const { data } = await axios.get("chirps");
    chirps.value = data
  } catch (error) {
    alert(`Something went wrong... ${error}`)
  } finally {
    loading.value = false
  }
}

function toggleLike(event, chirp) {
  chirp.liked = event;
  chirp.likes += event ? 1 : -1;
}

function toggleRechirp(event, chirp) {
  chirp.rechirped = event;
  chirp.rechirps += event ? 1 : -1;
}

onMounted(() => loadChirps())
</script>
