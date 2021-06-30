<template>
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
  import FeedChirp from "@/components/feed/FeedChirp.vue";
  import axios from "axios";

  export default {
    name: "Liked",
    components: {
      FeedChirp,
    },
    data() {
      return {
        chirps: [],
      };
    },
    computed: {
      user() {
        return this.$auth.user.value;
      },
      name() {
        return this.user.name;
      },
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
      const { data } = await axios.get("/api/chirps/liked", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      this.chirps = data;
    },
  };
</script>