<template>
  <div class="divide-y divide-gray-500">
    <LoadingIcon v-if="loading" />
    <FeedChirp
      v-else
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
    name: "Home",
    data() {
      return {
        chirps: [],
        loading: true,
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
      async loadChirps() {
        this.loading = true;
        try {
          const token = await this.$auth.getTokenSilently();
          const { data } = await axios.get("/api/chirps", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.chirps = data;
          this.loading = false;
        } catch (err) {
          alert(err);
          this.loading = false;
        }
      },
    },
    mounted() {
      this.loadChirps();
    },
  };
</script>