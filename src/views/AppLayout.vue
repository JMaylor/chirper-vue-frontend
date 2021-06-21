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
    <div class="container mx-auto max-w-4xl h-full">
      <HeaderBar />
      <NavBar />
      <div class="h-full w-full py-12 md:pb-0 md:pl-16">
        <router-view class="border-r border-gray-500 h-full" />
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
  html {
    @apply overflow-y-scroll;
  }
</style>