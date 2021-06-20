<template>
  <div
    class="
      w-screen
      h-screen
      min-h-screen
      bg-white
      dark:bg-black
      text-black
      dark:text-white
    "
  >
    <div class="container mx-auto h-full md:pl-36">
      <HeaderBar />
      <NavBar />
      <div class="h-full w-full py-12 overflow-y-auto">
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