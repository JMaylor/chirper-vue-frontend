<template>
  <div class="p-4 w-full">
    <div class="flex w-full space-x-2">
      <img
        referrerpolicy="no-referrer"
        :src="chirp.author.picture"
        :alt="chirp.author.name"
        class="h-12 rounded-full"
      />
      <div class="space-y-2 flex-grow">
        <div class="flex space-x-2 items-center">
          <router-link
            class="rounded-full group focus:outline-none"
            :to="{ name: 'User', params: { userId: chirp.author._id.$oid } }"
            ><span
              class="font-bold mr-2 group-hover:underline group-focus:underline"
              >{{ chirp.author.name }}</span
            ><span class="text-gray-500">{{
              chirp.author.handle
            }}</span></router-link
          ><span class="text-gray-500">•</span>
          <span class="text-sm text-gray-500">{{ time }}</span>
        </div>
        <span>{{ chirp.text }}</span>
        <div class="flex justify-between items-center pr-8 text-gray-500">
          <!-- Comment -->
          <div class="flex items-center space-x-2">
            <font-awesome-icon :icon="['far', 'comment']" />
            <span class="text-sm">{{ chirp.comments.length }}</span>
          </div>

          <!-- Like -->
          <button
            @click="toggleLike"
            class="
              action-container
              hover:text-pink-500
              focus-visible:text-pink-500
            "
            :class="{ 'text-pink-800': chirp.liked }"
          >
            <div
              class="
                h-8
                w-8
                flex
                rounded-full
                items-center
                justify-center
                space-x-2
                transition
                duration-200
                bg-opacity-0 bg-pink-900
                group-hover:bg-opacity-30
                group-focus-visible:bg-opacity-30
                group-focus-visible:ring-2
                group-focus-visible:ring-pink-500
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <span class="text-sm transition duration-200">{{
              chirp.likes
            }}</span>
          </button>

          <!-- Rechirp -->
          <button
            @click="toggleRechirp"
            class="
              action-container
              hover:text-green-500
              focus-visible:text-green-500
            "
            :class="{ 'text-green-800': chirp.rechirped }"
          >
            <div
              class="
                h-8
                w-8
                flex
                rounded-full
                items-center
                justify-center
                space-x-2
                transition
                duration-200
                bg-opacity-0 bg-green-900
                group-hover:bg-opacity-30
                group-focus-visible:bg-opacity-30
                group-focus-visible:ring-2
                group-focus-visible:ring-green-500
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
            <span class="text-sm transition duration-200">{{
              chirp.rechirps
            }}</span>
          </button>

          <!-- Share -->
          <button
            @click="copyShareLink"
            class="
              action-container
              hover:text-blue-500
              focus-visible:text-blue-500
            "
          >
            <div
              class="
                h-8
                w-8
                flex
                rounded-full
                items-center
                justify-center
                space-x-2
                transition
                duration-200
                bg-opacity-0 bg-blue-900
                group-hover:bg-opacity-30
                group-focus-visible:bg-opacity-30
                group-focus-visible:ring-2
                group-focus-visible:ring-blue-500
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
            </div>
          </button>
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
            `/api/chirps/${this.chirp._id.$oid}/like`,
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
            `/api/chirps/${this.chirp._id.$oid}/rechirp`,
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

<style lang="scss" scoped>
  .action-container {
    @apply flex items-center group space-x-2 px-1 focus:outline-none;
  }
</style>