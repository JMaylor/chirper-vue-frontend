<template>
  <div></div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { inject } from 'vue'

const route = useRoute()
const auth = inject('auth')

if (route.query.error) {
  auth.logout({
    returnTo:
      window.location.origin +
      `/error?error=${encodeURI(
        route.query.error
      )}&error_description=${encodeURI(
        route.query.error_description
      )}`,
  });
}
</script>