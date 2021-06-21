<template>
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
  import FeedChirp from "@/components/feed/FeedChirp.vue";
  import axios from "axios";

  export default {
    name: "Home",
    components: {
      FeedChirp,
    },
    data() {
      return {
        chirps: [],
      };
    },
    methods: {
      toggleLike(event, chirp) {
        chirp.liked = event;
        chirp.likes += event ? 1 : -1;
      },
      toggleRechirp(event, chirp) {
        chirp.rechirped = event;
        chirp.rechirps += event ? 1 : -1;
      },
    },
    async mounted() {
      const token = await this.$auth.getTokenSilently();
      const { data } = await axios.get("/api/chirps", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.chirps = data;
    },
  };
</script>