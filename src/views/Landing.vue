<template>
  <div class="w-screen h-screen flex flex-col text-black dark:text-white">
    <div class="flex-grow">
      <div class="flex flex-col lg:flex-row-reverse h-full w-full">
        <div
          class="
            bg-white
            dark:bg-black
            p-8
            h-1/2
            lg:h-full
            lg:w-1/2
            flex
            items-center
            justify-center
            lg:justify-start
          "
        >
          <div class="h-64 flex flex-col justify-between lg:pl-16">
            <font-awesome-icon size="2x" icon="crow" class="text-blue-400" />
            <h1 class="text-4xl sm:text-5xl xl:text-6xl">Happening now</h1>
            <h2 class="text-2xl">Join Chirper Today.</h2>
            <button
              @click="login"
              class="
                w-full
                rounded-full
                bg-blue-400
                py-3
                text-white
                font-bold
                focus:outline-none
                focus:ring-4
              "
            >
              Login with Google
            </button>
          </div>
        </div>
        <div
          class="
            h-1/2
            lg:h-full
            lg:w-1/2
            flex
            justify-center
            items-center
            relative
            bg-center
          "
          style="background-image: url('/src/assets/landing.png')"
        >
          <div class="h-full w-full absolute bg-black bg-opacity-30"></div>
          <font-awesome-icon
            size="10x"
            icon="crow"
            class="text-white dark:text-black z-10"
          />
        </div>
      </div>
    </div>
    <div
      class="
        bg-white
        dark:bg-black
        text-black
        dark:text-white
        text-xs
        space-x-3
        py-2
        flex
        justify-center
      "
    >
      <button>About</button>
      <button>Help Center</button>
      <button>Terms of Service</button>
      <button>Privacy Policy</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Landing",
    methods: {
      login() {
        this.$auth.loginWithRedirect({ connection: "google-oauth2" });
      },
    },
  };
</script>