<template>
  <div class="p-4 w-full">
    <div class="flex w-full space-x-2">
      <img
        :src="chirp.author.picture"
        :alt="chirp.author.name"
        class="h-12 rounded-full"
      />
      <div class="space-y-2 flex-grow">
        <div class="flex space-x-2 items-center">
          <span class="font-bold">
            {{ chirp.author.name }}
          </span>
          <span>{{ chirp.author.handle }}</span
          ><span>•</span>
          <span class="text-gray-500 text-sm">{{ time }}</span>
        </div>
        <span>{{ chirp.text }}</span>
        <div class="flex justify-between items-center pr-8 text-gray-700">
          <font-awesome-icon :icon="['far', 'comment']" />
          <div class="flex items-center space-x-1">
            <font-awesome-icon
              @click="toggleLike"
              :icon="['far', 'heart']"
              :color="chirp.liked ? 'red' : 'black'"
              class="transition"
            /><span class="text-sm">{{ chirp.likes }}</span>
          </div>
          <div class="flex items-center space-x-1">
            <font-awesome-icon
              @click="toggleRechirp"
              :icon="['fas', 'retweet']"
              :color="chirp.rechirped ? 'green' : 'black'"
              class="transition"
            /><span class="text-sm">{{ chirp.rechirps }}</span>
          </div>
          <font-awesome-icon :icon="['fas', 'share-alt']" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime";
  dayjs.extend(relativeTime);

  import axios from "axios";

  export default {
    name: "FeedChirp",
    props: {
      chirp: { type: Object, required: true },
    },
    data() {
      return {
        likeDisabled: false,
        rechirpDisabled: false,
      };
    },
    computed: {
      time() {
        return this.dateFromObjectId(this.chirp._id.$oid).fromNow();
      },
    },
    methods: {
      async toggleLike() {
        if (this.likeDisabled) return;
        this.likeDisabled = true;
        try {
          const token = await this.$auth.getTokenSilently();
          const {
            data: { like },
          } = await axios.post(
            `api/chirps/${this.chirp._id.$oid}/like`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          this.$emit("liked", like);
        } catch (error) {
          console.log(error);
        }
        this.likeDisabled = false;
      },
      async toggleRechirp() {
        if (this.rechirpDisabled) return;
        this.rechirpDisabled = true;
        try {
          const token = await this.$auth.getTokenSilently();
          const {
            data: { rechirp },
          } = await axios.post(
            `api/chirps/${this.chirp._id.$oid}/rechirp`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          this.$emit("rechirped", rechirp);
        } catch (error) {
          console.log(error);
        }
        this.rechirpDisabled = false;
      },
    },
  };
</script>

<style scoped>
</style>