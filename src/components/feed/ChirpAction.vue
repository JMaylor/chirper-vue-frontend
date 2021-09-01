<template>
  <button @click="toggleLike" class="action-container" :class="buttonClasses">
    <div
      class="h-8 w-8 flex relative rounded-full items-center justify-center transition duration-200 bg-opacity-0 group-hover:bg-opacity-10 dark:group-hover:bg-opacity-30 group-focus-visible:bg-opacity-10 dark:group-focus-visible:bg-opacity-30 group-focus-visible:ring-2"
      :class="svgContainerClasses"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 transition-fill duration-200"
        :fill="fill"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <slot name="path" />
      </svg>
      <div
        class="bg-gray-500 absolute hidden px-2 py-1 max-w-6xl group-focus-visible:block -bottom-7 left-1/2 transform transition duration-200 -translate-x-1/2 rounded text-xs text-white"
      >
        <slot name="tooltip">Tooltip</slot>
      </div>
    </div>
    <span class="text-sm transition duration-200">
      <slot />
    </span>
  </button>
</template>

<script setup>
defineProps({
  buttonClasses: {
    type: [Object, String],
    required: true,
  },
  fill: {
    type: [Object, String],
    required: false,
    default: "none",
  },
  svgContainerClasses: {
    type: [Object, String],
    required: true,
  },
});
</script>

<style>
.action-container {
  @apply flex items-center group space-x-2 px-1 focus:outline-none;
}
</style>