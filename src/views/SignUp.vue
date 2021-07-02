<template>
  <form
    @submit.prevent="signUp"
    class="text-black space-y-2 flex flex-col mt-4"
  >
    <img
      :src="user.picture"
      alt="user.name"
      class="rounded-full w-16 mx-auto"
    />
    <div class="flex items-center justify-center">
      <label class="block w-24 text-gray-700 text-sm font-semibold">
        Email
      </label>
      <input
        class="
          text-sm
          appearance-none
          rounded
          w-64
          py-2
          px-3
          text-gray-700
          bg-gray-400
          leading-tight
          focus:outline-none
          focus:shadow-outline
          h-10
        "
        disabled
        type="text"
        :value="user.email"
      />
    </div>
    <div class="flex items-center justify-center">
      <label class="block w-24 text-gray-700 text-sm font-semibold">
        Name
      </label>
      <input
        class="
          text-sm
          appearance-none
          rounded
          w-64
          py-2
          px-3
          text-gray-700
          bg-gray-200
          leading-tight
          focus:outline-none
          focus:shadow-outline
          h-10
        "
        type="text"
        pattern="[a-zA-Z0-9 ]{3,20}"
        required
        v-model="name"
      />
    </div>
    <div class="flex items-center justify-center">
      <label class="block w-24 text-gray-700 text-sm font-semibold" for="email">
        Handle
      </label>
      <div class="flex focus-within:ring">
        <div
          class="
            h-10
            w-8
            rounded-l
            bg-gray-400
            items-center
            justify-center
            flex
          "
        >
          @
        </div>
        <input
          class="
            text-sm
            rounded-r
            w-56
            py-2
            px-3
            text-gray-700
            bg-gray-200
            focus:outline-none
            h-10
          "
          pattern="[A-Za-z0-9]{6,20}"
          required
          v-model="handle"
        />
      </div>
    </div>
    <div class="flex items-center justify-center">
      <label class="block w-24 text-gray-700 text-sm font-semibold">
        Bio
      </label>
      <input
        class="
          text-sm
          appearance-none
          rounded
          w-64
          py-2
          px-3
          text-gray-700
          bg-gray-200
          leading-tight
          focus:outline-none
          focus:shadow-outline
          h-10
        "
        type="text"
        required
        v-model="bio"
      />
    </div>
    <button
      type="submit"
      class="bg-blue-500 px-4 py-2 rounded-full w-auto text-white mx-auto"
    >
      <LoadingIcon v-if="loading" /><span v-else>Get Chirping!</span>
    </button>
  </form>
</template>

<script>
  import axios from "axios";
  export default {
    name: "SignUp",
    emits: ["refresh"],
    data() {
      return {
        name: null,
        handle: null,
        bio: null,
        loading: false,
      };
    },
    computed: {
      user() {
        return this.$auth.user.value;
      },
      formData() {
        return {
          user_name: this.name,
          handle: this.handle,
          picture: this.user.picture,
          bio: this.bio,
        };
      },
    },
    methods: {
      async signUp() {
        this.loading = true;
        const token = await this.$auth.getTokenSilently();
        try {
          await axios.post("/api/users", this.formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.$emit("refresh");
          this.$router.push("/home");
        } catch (err) {
          this.loading = false;
          alert(err);
        }
      },
    },
    created() {
      this.name = this.user.name;
      this.bio = `Hey, I'm ${this.name}`;
    },
  };
</script>