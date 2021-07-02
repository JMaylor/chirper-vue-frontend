<template>
  <header
    class="
      bg-white
      dark:bg-black
      fixed
      top-0
      container
      mx-auto
      max-w-2xl
      md:pl-16
    "
  >
    <div
      class="
        px-4
        md:border-r
        h-12
        flex
        items-center
        justify-between
        border-b border-gray-500
      "
    >
      <div class="flex items-center space-x-4">
        <font-awesome-icon size="lg" icon="crow" class="text-blue-500" />
        {{ test }}
        <span class="text-2xl font-bold">{{ $route.name }}</span>
      </div>
      <div class="flex items-center space-x-4" v-if="user">
        <span class="text-gray-700 dark:text-gray-400 italic"
          >@{{ user.handle }}</span
        >
        <img
          :src="user.picture"
          alt="profile"
          class="rounded-full h-8 cursor-pointer"
          @click="
            $router.push({ name: 'User', params: { handle: user.user_id } })
          "
          referrerpolicy="no-referrer"
        />
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    name: "HeaderBar",
    props: {
      user: Object,
    },
    computed: {
      test() {
        return this.$store.state.count;
      },
    },
  };
</script>