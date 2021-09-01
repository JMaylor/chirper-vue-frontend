<template>
  <form @submit.prevent="signUp" class="text-black space-y-2 flex flex-col mt-4">
    <img :src="user.picture" alt="user.name" class="rounded-full w-16 mx-auto" />
    <div class="flex items-center justify-center">
      <label class="block w-24 text-gray-700 text-sm font-semibold">Email</label>
      <input
        class="text-sm appearance-none rounded w-64 py-2 px-3 text-gray-700 bg-gray-400 leading-tight focus:outline-none focus:shadow-outline h-10"
        disabled
        type="text"
        :value="user.email"
      />
    </div>
    <div class="flex items-center justify-center">
      <label class="block w-24 text-gray-700 text-sm font-semibold">Display Name</label>
      <input
        class="text-sm appearance-none rounded w-64 py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
        type="text"
        pattern="[a-zA-Z0-9 ]{3,20}"
        required
        v-model="name"
      />
    </div>
    <div class="flex items-center justify-center">
      <label class="block w-24 text-gray-700 text-sm font-semibold" for="email">Handle</label>
      <div class="flex focus-within:ring">
        <div class="h-10 w-8 rounded-l bg-gray-400 items-center justify-center flex">@</div>
        <input
          class="text-sm rounded-r w-56 py-2 px-3 text-gray-700 bg-gray-200 focus:outline-none h-10"
          pattern="[A-Za-z0-9]{6,20}"
          required
          v-model="handle"
        />
      </div>
    </div>
    <div class="flex items-center justify-center">
      <label class="block w-24 text-gray-700 text-sm font-semibold">Bio</label>
      <input
        class="text-sm appearance-none rounded w-64 py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
        type="text"
        required
        v-model="bio"
      />
    </div>
    <button type="submit" class="bg-blue-500 px-4 py-2 rounded-full w-auto text-white mx-auto">
      <LoadingIcon v-if="loading" />
      <span v-else>Get Chirping!</span>
    </button>
  </form>
</template>

<script setup>
import { inject, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const handle = ref(null)
const loading = ref(false)
const auth = inject('auth')
const user = computed(() => auth.user.value)
const name = ref(user.value.name)
const bio = ref(`Hey, I'm ${name.value}`)
const formData = computed(() => ({
  user_name: name.value,
  handle: handle.value,
  picture: user.value.picture,
  bio: bio.value
}))

const axios = inject('axios')
const emit = defineEmits(['refresh'])
const router = useRouter()
async function signUp() {
  loading.value = true;
  try {
    await axios.post("users", formData.value);
    emit("refresh");
    router.push("/home");
  } catch (err) {
    loading.value = false;
    alert(err);
  }
}
</script>