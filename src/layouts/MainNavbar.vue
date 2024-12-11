<script lang="ts" setup>
import AppThemeToggle from "@/components/AppThemeToggle.vue";

</script>

<template>
  <nav class="navbar">
    <div class="navbar-container">
      <router-link to="/">
        <h1 class="navbar-brand">
          <span>Poke</span>App
        </h1>
      </router-link>
      <div class="navbar-links">
        <router-link to="/team">Mi equipo</router-link>
        <AppThemeToggle />
      </div>
    </div>
  </nav>
</template>

<style lang="postcss" scoped>
.navbar {
  @apply sticky top-0 z-[1000];
  @apply bg-white dark:bg-gray-800;
  @apply shadow-md;
  @apply py-3;

  .navbar-container {
    @apply flex justify-between items-center;
    @apply 2xl:container mx-auto;
    @apply px-4;
  }

  .navbar-brand {
    @apply text-xl font-bold;

    span {
      @apply text-red-500;
    }

    &:hover {
      @apply opacity-80;
    }
  }

  .navbar-links {
    @apply flex justify-end items-center gap-3;

    a {
      @apply text-black dark:text-white;

      &:hover {
        @apply dark:text-blue-400 text-blue-600;
      }
    }

    a.router-link-active {
      @apply dark:text-blue-400 text-blue-600;
    }
  }
}
</style>
