<template>
  <div class="p-4">
    <AutoComplete
      v-model="query"
      @complete="searchHashtags"
      :suggestions="hashtags"
      @item-select="select"
    ></AutoComplete>
  </div>
  <router-view />
</template>

<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useDebounceFn } from '@vueuse/core'

const axios = inject('axios');

const query = ref('')
const hashtags = ref([])

const searchHashtags = useDebounceFn(async () => {
  if (query.value == "") return (hashtags.value = []);
  const { data } = await axios.get(
    `hashtags/search/${query.value}`
  );
  hashtags.value = data.map(({ tag }) => tag);
}, 200)

const router = useRouter()
function select({ value }) {
  router.push(`/hashtag/${value}`)
}
</script>

<style>
/* https://primefaces.org/primevue/showcase/#/autocomplete */
.p-autocomplete {
  @apply w-full;
}

.p-autocomplete-input {
  @apply bg-gray-300 dark:bg-gray-800 rounded-full focus:outline-none py-2 px-3 w-full;
}

.p-autocomplete-panel {
  @apply bg-gray-200 dark:bg-gray-800 text-black dark:text-white shadow-lg;
}

.p-autocomplete-items {
  @apply divide-y divide-gray-500;
}

.p-autocomplete-item {
  @apply p-3 hover:bg-gray-500 hover:text-white;
}

.p-highlight {
  @apply bg-gray-500 text-white;
}
</style>