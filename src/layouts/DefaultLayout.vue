<script lang="ts" setup>
import MainNavbar from "@/layouts/MainNavbar.vue";
</script>

<template>
  <MainNavbar/>
  <main class="2xl:container mx-auto px-4">
    <slot />
  </main>
</template>

<style lang="postcss" scoped>
</style>
