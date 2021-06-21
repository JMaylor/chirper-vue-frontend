<template>
  <form @submit.prevent="submitChirp" class="w-full p-4">
    <textarea
      maxlength="140"
      v-model="text"
      rows="4"
      class="
        p-2
        w-full
        rounded-lg
        bg-blue-200
        dark:bg-gray-800
        resize-none
        focus:outline-none
        focus:ring
      "
    ></textarea>
    <button type="submit">post</button>
  </form>
</template>

<script>
  import axios from "axios";
  export default {
    name: "Compose",
    data() {
      return {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum rutrum sodales. Nullam mattis fermentum libero, non volutpat.",
      };
    },
    methods: {
      async submitChirp() {
        try {
          const token = await this.$auth.getTokenSilently();
          await axios.post(
            "/api/chirps",
            {
              text: this.text,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          this.$router.push({ name: "Home" });
        } catch (error) {
          alert(error);
          console.error(error);
        }
      },
    },
  };
</script>