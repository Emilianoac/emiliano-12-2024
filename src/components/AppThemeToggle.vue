<script lang="ts" setup>
import { useTheme } from "@/composables/useTheme";
import IconMoon from "@/components/icons/IconMoon.vue";
import IconSun from "@/components/icons/IconSun.vue";

const { isDark, toggleTheme } = useTheme();
</script>

<template>
  <button 
    @click="toggleTheme" 
    :title="isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'"
    class="theme-toggle-button"
  >
    <component :is="isDark ? IconSun : IconMoon" />
  </button>
</template>

<style lang="postcss" scoped>
.theme-toggle-button {
  @apply h-8 w-8;
  @apply flex items-center justify-center;
  @apply rounded-full p-2;
  @apply bg-slate-200 dark:bg-gray-700;
  @apply p-1;

  &:hover {
    @apply bg-slate-300 dark:bg-gray-600;
  }

  svg {
    @apply h-5 w-5;
  }
}
</style>
