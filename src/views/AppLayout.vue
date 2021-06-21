<template>
  <div
    class="
      w-screen
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
      <div class="h-full w-full py-12 md:pb-0 md:pl-16 overflow-y-auto">
        <router-view class="border-r border-gray-500 h-full" />
        <router-link
          v-if="$route.name != 'Compose'"
          :to="{ name: 'Compose' }"
          tag="button"
          class="
            fixed
            bottom-16
            md:bottom-6
            right-6
            bg-blue-500
            h-16
            w-16
            rounded-full
            flex
            items-center
            justify-center
          "
        >
          <font-awesome-icon icon="feather-alt" size="lg" class="text-white" />
        </router-link>
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