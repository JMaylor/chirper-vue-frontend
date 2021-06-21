<template>
  <div class="divide-y divide-gray-500">
    <FeedChirp
      v-if="chirp"
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
    name: "Chirp",
    components: {
      FeedChirp,
    },
    data() {
      return {
        chirp: null,
      };
    },
    methods: {
      toggleLike(event) {
        this.chirp.liked = event;
        this.chirp.likes += event ? 1 : -1;
      },
      toggleRechirp(event) {
        this.chirp.rechirped = event;
        this.chirp.rechirps += event ? 1 : -1;
      },
    },
    async mounted() {
      const token = await this.$auth.getTokenSilently();
      const { data } = await axios.get(
        `/api/chirp/${this.$route.params.chirpId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      this.chirp = data;
    },
  };
</script>