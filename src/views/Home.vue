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
  <div
    class="
      fixed
      bottom-16
      md:bottom-6
      right-6
      bg-blue-500
      h-16
      w-16
      rounded-full
      flex
      items-center
      justify-center
    "
  >
    <font-awesome-icon icon="feather-alt" size="lg" class="text-white" />
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
      const { data } = await axios.get("api/chirps", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.chirps = data;
    },
  };
</script>