<template>
  <div class="p-4 w-full">
    <!-- <Toast position="bottom-center" /> -->
    <div class="flex w-full space-x-2">
      <img
        referrerpolicy="no-referrer"
        :src="chirp.picture"
        :alt="chirp.user_name"
        class="h-12 rounded-full cursor-pointer"
        @click="
          $router.push({ name: 'User', params: { handle: chirp.handle } })
        "
      />
      <div class="space-y-2 flex-grow">
        <div class="flex space-x-2 items-center whitespace-nowrap">
          <router-link
            class="rounded-full group focus:outline-none"
            :to="{ name: 'User', params: { handle: chirp.handle } }"
            ><span
              class="font-bold mr-2 group-hover:underline group-focus:underline"
              >{{ chirp.user_name }}</span
            ><span class="text-gray-500"
              >@{{ truncatedHandle }}</span
            ></router-link
          ><span class="text-gray-500">•</span>
          <span class="text-sm text-gray-500">{{ time }}</span>
        </div>
        <ChirpWithLinks :text="chirp.body" />
        <!-- <span class="whitespace-pre-wrap">{{ chirp.text }}</span> -->

        <!-- Chirp Actions -->
        <div class="flex justify-between items-center pr-8 text-gray-500">
          <!-- Like Button -->
          <ChirpAction
            :buttonClasses="{
              'hover:text-purple-500 focus-visible:text-purple-500': true,
            }"
            :svgContainerClasses="'bg-purple-900 group-focus-visible:ring-purple-500'"
          >
            <template v-slot:default>{{ chirp.comments }}</template>
            <template v-slot:path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </template>
          </ChirpAction>

          <!-- Like Button -->
          <ChirpAction
            @click="toggleLike"
            :buttonClasses="{
              'text-pink-500': chirp.liked,
              'hover:text-pink-500 focus-visible:text-pink-500': true,
            }"
            :svgContainerClasses="'bg-pink-900 group-focus-visible:ring-pink-500'"
            :fill="chirp.liked ? 'currentColor' : 'transparent'"
          >
            <template v-slot:default>{{ chirp.likes }}</template>
            <template v-slot:path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </template>
          </ChirpAction>

          <!-- Rechirp Button -->
          <ChirpAction
            @click="toggleRechirp"
            :buttonClasses="{
              'text-green-500': chirp.rechirped,
              'hover:text-green-500 focus-visible:text-green-500': true,
            }"
            :svgContainerClasses="'bg-green-900 group-focus-visible:ring-green-500'"
          >
            <template v-slot:default>{{ chirp.rechirps }}</template>
            <template v-slot:path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </template>
          </ChirpAction>

          <!-- Share Button -->
          <ChirpAction
            v-clipboard:copy="shareLink"
            v-clipboard:success="onCopy"
            :buttonClasses="{
              'hover:text-blue-500 focus-visible:text-blue-500': true,
            }"
            :svgContainerClasses="'bg-blue-900 group-focus-visible:ring-blue-500'"
          >
            <template v-slot:path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </template>
          </ChirpAction>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import TimeAgo from "javascript-time-ago";
  import en from "javascript-time-ago/locale/en";
  TimeAgo.locale(en);
  const timeAgo = new TimeAgo("en-GB");
  import ChirpWithLinks from "./ChirpWithLinks.vue";
  import ChirpAction from "./ChirpAction.vue";

  export default {
    name: "FeedChirp",
    components: {
      ChirpWithLinks,
      ChirpAction,
    },
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
        // return dayjs(this.chirp.created_at).fromNow();
        return timeAgo.format(new Date(this.chirp.created_at), "twitter");
      },
      textWithLinks() {
        return this.chirp?.body?.replace(
          /#(\w+)/g,
          '<router-link to="tag/$1">#$1</router-link>'
        );
      },
      availableHandleLength() {
        return 26 - this.chirp.user_name.length;
      },
      truncatedHandle() {
        const handle = this.chirp.handle;
        if (!handle) return "";
        if (handle.length < this.availableHandleLength) return handle;
        return `${handle.substr(0, this.availableHandleLength - 3)}...`;
      },
      shareLink() {
        return `${window.location.origin}/chirp/${this.chirp.chirp_id}`;
      },
    },
    methods: {
      async toggleLike() {
        if (this.likeDisabled) return;
        this.likeDisabled = true;
        try {
          const token = await this.$auth.getTokenSilently();
          await axios.post(
            `/api/like`,
            {
              chirp: this.chirp.chirp_id,
              liked: !this.chirp.liked,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          this.$emit("liked", !this.chirp.liked);
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
          await axios.post(
            `/api/rechirp`,
            {
              chirp: this.chirp.chirp_id,
              rechirped: !this.chirp.rechirped,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          this.$emit("rechirped", !this.chirp.rechirped);
        } catch (error) {
          console.log(error);
        }
        this.rechirpDisabled = false;
      },
      onCopy() {
        alert("link copied to clipboard");
      },
    },
  };
</script>

