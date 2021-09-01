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
        <span class="font-bold">{{ user.user_name }}</span>
        <span class="text-gray-500">@{{ user.handle }}</span>
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
          class="p-2 w-full rounded-lg bg-transparent resize-none focus:outline-none focus:ring"
        ></textarea>
        <div class="flex flex-col items-center text-sm justify-between">
          <span :class="textColorClass">{{ commentLength }}/140</span>
          <button type="submit" class="bg-blue-500 px-3 py-1 rounded-full">Comment</button>
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
        >
          <span class="font-bold mr-2 group-hover:underline group-focus:underline">{{ user_name }}</span>
          <span class="text-gray-500">@{{ handle }}</span>
        </router-link>
        <span class="text-gray-500">•</span>
        <span class="text-sm text-gray-500">{{ time(created_at) }}</span>
      </div>
      {{ body }}
    </div>
  </div>
  <button v-if="!allCommentsLoaded" @click="fetchComments">load more</button>
</template>

<script setup>
import { useStore } from "vuex";
import { ref, inject, onMounted, computed } from "vue";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.locale(en);
const timeAgo = new TimeAgo("en-GB");

const emit = defineEmits(["increment"]);

const props = defineProps({
  chirpId: Number,
});

const axios = inject("axios");

const comments = ref([]);

const allCommentsLoaded = ref(false);

const oldestTimestamp = computed(() => {
  const numComments = comments.value.length;
  if (numComments == 0) return 0;
  return comments.value[numComments - 1].created_at;
});

async function fetchComments() {
  try {
    const { data } = await axios.get(`comments`, {
      params: {
        chirpId: props.chirpId,
        timestamp: oldestTimestamp.value,
      },
    });
    comments.value.push(...data);
    if (data.length < 3) {
      allCommentsLoaded.value = true;
    }
  } catch (error) {
    alert(error);
  }
}
onMounted(() => fetchComments());

function time(created_at) {
  return timeAgo.format(new Date(created_at), "twitter");
}

const commentLength = computed(() => {
  return text.value.length;
});
const textColorClass = computed(() => {
  if (commentLength.value == 140) return "text-red-500";
  if (commentLength.value >= 120) return "text-yellow-500";
  return "";
});

const text = ref("");
const user = computed(() => {
  const store = useStore();
  return store.state.user;
});

async function postComment() {
  try {
    const { data: comment } = await axios.post(`comment`, {
      chirp_id: props.chirpId,
      body: text.value,
    });
    comments.value.unshift({
      ...comment,
      ...user.value,
    });
    emit("increment");
  } catch (error) {
    alert(error);
  }
}
</script>
