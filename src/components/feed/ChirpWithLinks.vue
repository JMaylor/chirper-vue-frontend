<template>
  <component v-bind:is="transformedText" />
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  text: String
})

const transformedText = computed(() => {
  return {
    template: `<span class="whitespace-pre-wrap">${props.text.replace(
      /#(\w+)/g,
      '<router-link class="hashtag" to="/hashtag/$1">#$1</router-link>'
    )}</span>`,
  };
})
</script>

<style>
.hashtag {
  @apply text-green-500;
}
</style>
