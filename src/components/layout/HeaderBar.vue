<template>
  <header
    v-if="user"
    class="
      bg-white
      dark:bg-black
      fixed
      top-0
      h-12
      w-full
      flex
      items-center
      justify-between
      border-b border-gray-500
      px-4
    "
  >
    <div class="flex items-center space-x-4">
      <font-awesome-icon size="lg" icon="crow" class="text-blue-500" />
      <span class="text-2xl font-bold">{{ $route.name }}</span>
    </div>
    <div class="flex items-center space-x-4">
      <span class="text-gray-700 italic">{{ user.handle }}</span>
      <img :src="user.picture" alt="profile" class="rounded-full h-8" />
    </div>
  </header>
</template>

<script>
  import axios from "axios";
  export default {
    name: "HeaderBar",
    data() {
      return {
        user: null,
      };
    },
    async mounted() {
      const token = await this.$auth.getTokenSilently();
      console.log(token);
      const response = await axios.get("api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.user = response.data;
    },
  };
</script>