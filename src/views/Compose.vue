<template>
  <form @submit.prevent="submitChirp" class="w-full p-4 space-y-2">
    <textarea
      required
      maxlength="140"
      minlength="1"
      v-model="text"
      placeholder="What's happening?"
      rows="4"
      class="
        p-2
        text-xl
        w-full
        rounded-lg
        bg-transparent
        resize-none
        focus:outline-none
        focus:ring
      "
    ></textarea>
    <div class="flex justify-between items-center">
      <button type="submit" class="bg-blue-500 px-4 py-2 rounded-full">
        Chirp
      </button>
      <span :class="textColorClass">{{ chirpLength }}/140</span>
    </div>
  </form>
</template>

<script>
  import axios from "axios";
  export default {
    name: "Compose",
    data() {
      return {
        text: "",
      };
    },
    methods: {
      async submitChirp() {
        try {
          const token = await this.$auth.getTokenSilently();
          await axios.post(
            "/api/chirps",
            {
              body: this.text,
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
    computed: {
      chirpLength() {
        return this.text.length;
      },
      textColorClass() {
        if (this.chirpLength == 140) return "text-red-500";
        if (this.chirpLength >= 120) return "text-yellow-500";
        return "";
      },
    },
  };
</script>