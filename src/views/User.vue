<template>
  <div class="border-b border-gray-500 p-4" v-if="user">
    <div class="flex justify-between">
      <img :src="user.picture" :alt="user.user_name" class="h-32 rounded-full" />
      <!-- <button>follow</button> -->
    </div>
    <h2 class="text-2xl font-bold">{{ user.user_name }}</h2>
    <h3 class="text-xl font-medium text-gray-500 mb-6">@{{ user.handle }}</h3>
    <p>{{ user.bio }}</p>
  </div>
  <div class="divide-y divide-gray-500">
    <FeedChirp
      v-if="chirps && user"
      v-for="chirp in chirps"
      :key="chirp.chirp_id"
      :showRechirp="user.handle == chirp.handle ? null : user.user_name"
      :chirp="chirp"
      @liked="toggleLike($event, chirp)"
      @rechirped="toggleRechirp($event, chirp)"
    />
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const axios = inject('axios')

const chirps = ref([])
const user = ref(null)

const route = useRoute()
async function loadUserChirps() {
  const { data } = await axios.get(
    `chirps/user/${route.params.handle}`);
  chirps.value = data;
}

async function loadUserProfile() {
  const { data } = await axios.get(
    `user/handle/${route.params.handle}`);
  user.value = data;
}

function toggleLike(event, chirp) {
  chirp.liked = event;
  chirp.likes += event ? 1 : -1;
}
function toggleRechirp(event, chirp) {
  chirp.rechirped = event;
  chirp.rechirps += event ? 1 : -1;
}

onMounted(() => {
  loadUserChirps();
  loadUserProfile();
})
</script>