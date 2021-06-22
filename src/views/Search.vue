<template>
  <div class="p-4">
    <AutoComplete
      v-model="query"
      @complete="searchHashtags"
      :suggestions="hashtags"
      @item-select="select"
    >
    </AutoComplete>
  </div>
</template>

<script>
  import axios from "axios";
  import debounce from "lodash.debounce";

  export default {
    name: "Search",
    data() {
      return {
        query: "",
        hashtags: [],
      };
    },
    methods: {
      searchHashtags: debounce(async function () {
        if (this.query == "") return (this.hashtags = []);
        const { data: hashtags } = await axios.get(
          `/api/hashtags?query=${this.query}`
        );
        this.hashtags = hashtags.map(({ name }) => name);
      }, 200),
      select({ value }) {
        this.$router.push(`/hashtag/${value}`);
      },
    },
  };
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