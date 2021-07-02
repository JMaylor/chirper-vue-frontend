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

<script>
  import axios from "axios";
  export default {
    name: "Hashtag",
    data() {
      return {
        chirps: null,
      };
    },
    computed: {
      hashtag() {
        return this.$route.params.hashtag;
      },
    },
    methods: {
      async getChirps() {
        const token = await this.$auth.getTokenSilently();
        const { data } = await axios.get(`/api/chirps/hashtag/${this.hashtag}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.chirps = data;
      },
      toggleLike(event, chirp) {
        chirp.liked = event;
        chirp.likes += event ? 1 : -1;
      },
      toggleRechirp(event, chirp) {
        chirp.rechirped = event;
        chirp.rechirps += event ? 1 : -1;
      },
    },
    mounted() {
      this.getChirps();
    },
    updated() {
      this.getChirps();
    },
  };
</script>