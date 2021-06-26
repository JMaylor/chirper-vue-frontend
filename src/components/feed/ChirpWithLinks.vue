<template>
  <component v-bind:is="transformedText" />
</template>

<script>
  export default {
    name: "ChirpWithLinks",
    props: {
      text: String,
    },
    computed: {
      transformedText() {
        return {
          template: `<span class="whitespace-pre-wrap">${this.text.replace(
            /#(\w+)/g,
            '<router-link class="hashtag" to="/hashtag/$1">#$1</router-link>'
          )}</span>`,
        };
      },
    },
  };
</script>

<style>
  .hashtag {
    @apply text-green-500;
  }
</style>
