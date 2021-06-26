<template>
  <form
    @submit.prevent="signUp"
    class="text-black space-y-2 flex flex-col mt-4"
  >
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

    <img :src="user.picture" alt="user.name" class="rounded-full w-16" />
    <button
      type="submit"
      class="
        bg-black
        text-white
        dark:text-black
        dark:bg-white
        w-16
        mx-auto
        rounded
      "
    >
      sign up
    </button>
  </form>
</template>

<script>
  import axios from "axios";
  export default {
    name: "SignUp",
    data() {
      return {
        name: null,
        handle: null,
      };
    },
    computed: {
      user() {
        return this.$auth.user.value;
      },
      formData() {
        return {
          email: this.user.email,
          name: this.name,
          handle: `@${this.handle}`,
          picture: this.user.picture,
        };
      },
    },
    methods: {
      async signUp() {
        const token = await this.$auth.getTokenSilently();
        try {
          await axios.post("/api/auth/signup", this.formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.$emit("refresh-user");
          this.$router.push("/home");
        } catch (err) {
          alert(err);
        }
      },
    },
    created() {
      this.name = this.user.name;
    },
  };
</script>