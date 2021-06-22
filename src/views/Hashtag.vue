<template>
  results by hashtag
  <div class="divide-y divide-gray-500">
    <FeedChirp
      v-for="chirp in chirps"
      :key="chirp._id.$oid"
      :chirp="chirp"
      @liked="toggleLike($event, chirp)"
      @rechirped="toggleRechirp($event, chirp)"
    />
  </div>
</template>

<script>
  import axios from "axios";
  import FeedChirp from "@/components/feed/FeedChirp.vue";
  export default {
    name: "Hashtag",
    components: {
      FeedChirp,
    },
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
    beforeRouteUpdate(to, from, next) {
      this.getChirps();
      next();
    },
  };
</script>