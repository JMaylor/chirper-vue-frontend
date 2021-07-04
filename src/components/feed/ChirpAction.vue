<template>
  <button @click="toggleLike" class="action-container" :class="buttonClasses">
    <div
      class="
        h-8
        w-8
        flex
        rounded-full
        items-center
        justify-center
        space-x-2
        transition
        duration-200
        bg-opacity-0
        group-hover:bg-opacity-10
        dark:group-hover:bg-opacity-30
        group-focus-visible:bg-opacity-10
        dark:group-focus-visible:bg-opacity-30
        group-focus-visible:ring-2
      "
      :class="svgContainerClasses"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 transition-fill duration-200"
        :fill="fill"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <slot name="path">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </slot>
      </svg>
    </div>
    <span class="text-sm transition duration-200"><slot /></span>
  </button>
</template>

<script>
  export default {
    name: "ChirpAction",
    props: {
      buttonClasses: {
        type: [Object, String],
        required: true,
      },
      fill: {
        type: String,
        required: false,
      },
      svgContainerClasses: {
        type: String,
        required: true,
      },
    },
  };
</script>

<style>
  .action-container {
    @apply flex items-center group space-x-2 px-1 focus:outline-none;
  }
</style>