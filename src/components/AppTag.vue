<script lang="ts" setup>

defineProps<{ 
  tag: string 
}>();
</script>

<template>
  <div class="tag">{{ tag }}</div>
</template>

<style lang="postcss" scoped>
  .tag {
    @apply inline-block;
    @apply bg-gray-200 dark:bg-gray-700;
    @apply px-2 py-1 rounded-md mr-2;
    @apply text-xs first-letter:uppercase font-semibold;
  }
</style>
