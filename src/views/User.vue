<template>
  <div class="border-b border-gray-500 p-4" v-if="user">
    <div class="flex justify-between">
      <img
        :src="user.picture"
        :alt="user.user_name"
        class="h-32 rounded-full"
      />
      <!-- <button>follow</button> -->
    </div>
    <h2 class="text-2xl font-bold">{{ user.user_name }}</h2>
    <h3 class="text-xl font-medium text-gray-500 mb-6">@{{ user.handle }}</h3>
    <p>{{ user.bio }}</p>
  </div>
  <div class="divide-y divide-gray-500">
    <FeedChirp
      v-for="chirp in chirps"
      :key="chirp.chirp_id"
      :showRechirp="user.handle == chirp.handle ? null : user.user_name"
      :chirp="chirp"
      @liked="toggleLike($event, chirp)"
      @rechirped="toggleRechirp($event, chirp)"
    />
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "User",

    data() {
      return {
        chirps: [],
        user: null,
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
      async loadUserChirps() {
        const token = await this.$auth.getTokenSilently();
        const { data } = await axios.get(
          `/api/chirps/user/${this.$route.params.handle}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.chirps = data;
      },
      async loadUserProfile() {
        const token = await this.$auth.getTokenSilently();
        const { data } = await axios.get(
          `/api/user/handle/${this.$route.params.handle}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.user = data;
      },
    },
    mounted() {
      this.loadUserChirps();
      this.loadUserProfile();
    },
  };
</script>