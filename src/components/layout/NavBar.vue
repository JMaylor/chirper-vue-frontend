<template>
  <nav
    class="w-full md:w-16 md:h-full bg-white dark:bg-black fixed bottom-0 md:block border-t border-gray-500 md:border-t-0 md:border-r"
  >
    <div
      class="w-full h-12 md:h-full md:items-center flex md:flex-col justify-between md:justify-start"
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
          class="m-2 w-full flex items-center justify-center rounded-full text-gray-500 focus:outline-none group"
        >
          <div
            class="transition duration-200 rounded-full w-10 h-10 flex items-center justify-center group-focus-visible:ring-2 group-focus-visible:ring-blue-500 group-focus-visible:text-blue-500 bg-opacity-0 bg-blue-900 hover:bg-opacity-10 hover:text-blue-500 dark:hover:bg-opacity-30 group-focus-visible:bg-opacity-10 dark:group-focus-visible:bg-opacity-30"
          >
            <font-awesome-icon size="lg" :icon="icon" />
          </div>
        </button>
      </router-link>
      <button
        @click="logout"
        class="transition m-2 md:mt-auto w-full flex items-center justify-center rounded-full text-gray-500 focus:outline-none group"
      >
        <div
          class="transition duration-200 rounded-full w-10 h-10 flex items-center justify-center group-focus-visible:ring-2 group-focus-visible:ring-red-500 group-focus-visible:text-red-500 bg-opacity-0 bg-red-900 hover:bg-opacity-10 hover:text-red-500 dark:hover:bg-opacity-30 group-focus-visible:bg-opacity-10 dark:group-focus-visible:bg-opacity-30"
        >
          <font-awesome-icon size="lg" :icon="['fas', 'sign-out-alt']" />
        </div>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { inject } from 'vue'
const routes = [
  { name: "Home", icon: "home" },
  { name: "Search", icon: "search" },
  { name: "Compose", icon: "feather-alt" },
  { name: "Liked", icon: ["far", "heart"] },
  // { name: "Settings", icon: "cog" },
]

const auth = inject('auth')

function logout() {
  auth.logout({
    returnTo: window.location.origin,
  });
}
</script>