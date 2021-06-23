<template>
  <div
    class="
      w-full
      min-h-screen
      bg-white
      dark:bg-black
      text-black
      dark:text-white
    "
  >
    <div class="container mx-auto max-w-2xl h-full">
      <HeaderBar :user="user" />
      <NavBar v-if="initialised && $route.name != 'SignUp'" />
      <div class="h-full w-full py-12 md:pb-0 md:pl-16">
        <router-view
          v-if="initialised"
          @refresh-user="getUser"
          class="border-r border-gray-500 h-full"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import HeaderBar from "@/components/layout/HeaderBar.vue";
  import NavBar from "@/components/layout/NavBar.vue";
  import axios from "axios";
  export default {
    name: "AppLayout",
    components: {
      HeaderBar,
      NavBar,
    },
    data() {
      return {
        user: null,
        initialised: false,
      };
    },
    methods: {
      async getUser() {
        const token = await this.$auth.getTokenSilently();
        console.log(token);
        try {
          const { data } = await axios.get("/api/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.user = data;
        } catch (err) {
          await this.$router.push("/signup");
        }
        this.initialised = true;
      },
    },
    mounted() {
      this.getUser();
    },
  };
</script>

<style lang="scss">
  html {
    @apply overflow-y-scroll;
  }
</style>