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
  import axios from "axios";

  export default {
    name: "Chirp",
    data() {
      return {
        chirp: null,
      };
    },
    methods: {
      toggleLike(value) {
        this.chirp.liked = value;
        this.chirp.likes += value ? 1 : -1;
      },
      toggleRechirp(value) {
        this.chirp.rechirped = value;
        this.chirp.rechirps += value ? 1 : -1;
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