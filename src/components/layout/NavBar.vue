<template>
  <nav
    class="
      w-full
      md:w-16
      md:h-full
      bg-white
      dark:bg-black
      fixed
      bottom-0
      md:block
      border-t border-gray-500
      md:border-t-0 md:border-r
    "
  >
    <div
      class="
        w-full
        h-12
        md:h-full
        md:space-y-6
        md:items-center
        md:p-4
        flex
        md:flex-col
        justify-between
        md:justify-start
      "
    >
      <router-link
        v-for="{ name, icon } in routes"
        :key="name"
        :to="{ name }"
        custom
        v-slot="{ navigate, isActive }"
      >
        <button
          @click="navigate"
          :class="{ 'text-blue-500': isActive }"
          class="w-full text-gray-500"
        >
          <font-awesome-icon size="lg" :icon="icon" />
        </button>
      </router-link>
      <button @click="logout" class="w-full text-gray-500">
        <font-awesome-icon size="lg" :icon="['fas', 'sign-out-alt']" />
      </button>
    </div>
  </nav>
</template>

<script>
  export default {
    name: "NavBar",
    data() {
      return {
        routes: [
          { name: "Home", icon: "home" },
          { name: "Search", icon: "search" },
          { name: "Liked", icon: ["far", "heart"] },
          { name: "Settings", icon: "cog" },
        ],
      };
    },
    methods: {
      logout() {
        this.$auth.logout({
          returnTo: window.location.origin,
        });
      },
    },
  };
</script>
