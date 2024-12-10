<script lang="ts" setup>
  defineProps<{
    progress: number;
    color: string;
  }>();
</script>

<template>
  <div class="progress-bar">
    <div class="progress-bar__progress" :style="{ width: progress + '%' }" :class="color"></div>
  </div>
  
</template>

<style lang="postcss" scoped>
  .progress-bar {
    @apply bg-gray-200 dark:bg-gray-700 h-2 rounded-md flex justify-start;
  }

  .progress-bar__progress {
    @apply h-2 rounded-md;
  }
</style>
