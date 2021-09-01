<template>
  <form @submit.prevent="submitChirp" class="w-full p-4 space-y-2">
    <textarea
      required
      maxlength="140"
      minlength="1"
      v-model="text"
      placeholder="What's happening?"
      rows="4"
      class="p-2 text-xl w-full rounded-lg bg-transparent resize-none focus:outline-none focus:ring"
    ></textarea>
    <div class="flex justify-between items-center">
      <button type="submit" class="bg-blue-500 px-4 py-2 rounded-full">Chirp</button>
      <span :class="textColorClass">{{ chirpLength }}/140</span>
    </div>
  </form>
</template>

<script setup>
import { ref, inject, computed } from 'vue'
import { useRouter } from 'vue-router'

const axios = inject('axios')
const router = useRouter()

const text = ref('')

const chirpLength = computed(() => text.value.length)

const textColorClass = computed(() => {
  if (chirpLength.value == 140) return "text-red-500";
  if (chirpLength.value >= 120) return "text-yellow-500";
  return "";
})

async function submitChirp() {
  try {
    await axios.post(
      "chirps",
      {
        body: text.value,
      },
    );
    
    router.push({ name: "Home" });
  } catch (error) {
    alert(error);
  }
}
</script>