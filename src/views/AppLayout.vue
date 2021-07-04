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
      <HeaderBar />
      <NavBar v-if="$route.name != 'SignUp'" />
      <div
        class="
          overflow-y-scroll
          h-screen
          w-full
          py-12
          md:pb-0
          md:pl-16
          md:border-r
          border-gray-500
        "
      >
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
  import HeaderBar from "@/components/layout/HeaderBar.vue";
  import NavBar from "@/components/layout/NavBar.vue";
  export default {
    name: "AppLayout",
    components: {
      HeaderBar,
      NavBar,
    },
  };
</script>

<style lang="scss">
  ::-webkit-scrollbar-track {
    @apply bg-gray-500;
    // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  ::-webkit-scrollbar {
    @apply bg-gray-500 w-1;
  }

  ::-webkit-scrollbar-thumb {
    @apply bg-gradient-to-b from-blue-400 to-blue-700 rounded-full;
  }
</style>