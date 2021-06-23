<template>
  <form @submit.prevent="signUp" class="flex flex-col text-black">
    <input disabled :value="user.email" />
    <input v-model="name" placeholder="display name" />
    <input v-model="handle" placeholder="handle" />
    <img :src="user.picture" alt="user.name" class="rounded-full w-16" />
    <button type="submit">sign up</button>
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