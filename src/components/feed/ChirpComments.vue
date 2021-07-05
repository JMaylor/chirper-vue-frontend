<template>
  <h4>Comments</h4>
  {{ chirpId }}
</template>

<script>
  export default {
    name: "ChirpComments",
    props: {
      chirpId: Number,
    },
    methods: {
      fetchComments() {
        // method to fetch comments
      },
    },
  };
</script>