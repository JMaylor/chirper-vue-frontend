<template>
  <h4>Comments</h4>
  <div class="flex w-full space-x-2 pb-3 border-b border-gray-500">
    <img
      referrerpolicy="no-referrer"
      :src="user.picture"
      :alt="user.user_name"
      class="h-8 rounded-full"
    />
    <div class="space-y-2 flex-grow">
      <div class="flex space-x-2 items-center whitespace-nowrap">
        <span class="font-bold">{{ user.user_name }}</span
        ><span class="text-gray-500">@{{ user.handle }}</span>
      </div>
      <form @submit.prevent="postComment" class="flex space-x-2">
        <textarea
          @keydown.stop
          required
          maxlength="140"
          minlength="1"
          v-model="text"
          placeholder="What do you make of this?"
          rows="2"
          class="
            p-2
            w-full
            rounded-lg
            bg-transparent
            resize-none
            focus:outline-none
            focus:ring
          "
        ></textarea>
        <div class="flex flex-col items-center text-sm justify-between">
          <span :class="textColorClass">{{ commentLength }}/140</span>
          <button type="submit" class="bg-blue-500 px-3 py-1 rounded-full">
            Comment
          </button>
        </div>
      </form>
    </div>
  </div>

  <div
    class="flex w-full space-x-2"
    v-for="{
      body,
      comment_id,
      created_at,
      handle,
      picture,
      user_name,
    } in comments"
    :key="comment_id"
  >
    <img
      referrerpolicy="no-referrer"
      :src="picture"
      :alt="user_name"
      class="h-8 rounded-full cursor-pointer"
      @click="$router.push({ name: 'User', params: { handle: handle } })"
    />
    <div class="space-y-2 flex-grow">
      <div class="flex space-x-2 items-center whitespace-nowrap">
        <router-link
          class="rounded-full group focus:outline-none"
          :to="{ name: 'User', params: { handle: handle } }"
          ><span
            class="font-bold mr-2 group-hover:underline group-focus:underline"
            >{{ user_name }}</span
          ><span class="text-gray-500">@{{ handle }}</span></router-link
        ><span class="text-gray-500">•</span>
        <span class="text-sm text-gray-500">{{ time(created_at) }}</span>
      </div>
      {{ body }}
    </div>
  </div>
  <button v-if="!allCommentsLoaded" @click="fetchComments">load more</button>
</template>

<script>
  import axios from "axios";
  import TimeAgo from "javascript-time-ago";
  import en from "javascript-time-ago/locale/en";
  TimeAgo.locale(en);
  const timeAgo = new TimeAgo("en-GB");

  export default {
    name: "ChirpComments",
    props: {
      chirpId: Number,
    },
    data() {
      return {
        comments: [],
        text: "",
        allCommentsLoaded: false,
      };
    },
    computed: {
      user() {
        return this.$store.state.user;
      },
      commentLength() {
        return this.text.length;
      },
      textColorClass() {
        if (this.commentLength == 140) return "text-red-500";
        if (this.commentLength >= 120) return "text-yellow-500";
        return "";
      },
      oldestTimestamp() {
        const numComments = this.comments.length;
        if (numComments == 0) return 0;
        return this.comments[numComments - 1].created_at;
      },
    },
    methods: {
      async fetchComments() {
        try {
          const token = await this.$auth.getTokenSilently();
          const { data: comments } = await axios.get(`/api/comments`, {
            params: {
              chirpId: this.chirpId,
              timestamp: this.oldestTimestamp,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.comments.push(...comments);
          if (comments.length < 3) {
            this.allCommentsLoaded = true;
          }
        } catch (error) {
          console.log(error);
        }
      },
      async postComment($event) {
        console.log($event);
        try {
          const token = await this.$auth.getTokenSilently();
          const { data: comment } = await axios.post(
            `/api/comment`,
            {
              chirp_id: this.chirpId,
              body: this.text,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          this.comments.unshift({
            ...comment,
            ...this.user,
          });
          this.$emit("increment");
        } catch (error) {
          console.log(error);
        }
      },
      time(created_at) {
        return timeAgo.format(new Date(created_at), "twitter");
      },
    },
    mounted() {
      this.fetchComments();
    },
  };
</script>