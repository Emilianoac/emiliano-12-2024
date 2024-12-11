<script lang="ts" setup>
  defineProps<{
    progress: number;
    statName: string;
  }>();

  const statColors: Record<string, string> = {
    "hp": "bg-red-500",
    "attack": "bg-yellow-500",
    "defense": "bg-green-500",
    "special-attack": "bg-orange-500",
    "special-defense": "bg-purple-500",
    "speed": "bg-blue-500",
  };
</script>

<template>
  <div class="progress-bar-container">
    <p class="progress-bar-title">
      {{ statName }}: 
      <span class="font-normal">{{ progress }}</span>
    </p>
    <div class="progress-bar">
      <div class="progress-bar-progress" :style="{ width: progress + '%' }" :class="statColors[statName]"></div>
    </div>
  </div>
  
</template>

<style lang="postcss" scoped>
  .progress-bar-container {

    .progress-bar-title {
      @apply text-sm font-semibold first-letter:uppercase block;
      @apply mb-1;
    }

    .progress-bar {
      @apply bg-gray-200 dark:bg-gray-700 h-2;
      @apply rounded-md;
      @apply flex justify-start;
      @apply mb-2;
    }

    .progress-bar-progress {
      @apply h-2 rounded-md;
    }
  }

</style>
