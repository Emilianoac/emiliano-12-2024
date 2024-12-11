<script lang="ts" setup>
import AppSkeleton from "@/components/AppSkeleton.vue";
</script>

<template>
  <article class="member-card">
    <div class="member-card-header">
      <!--- Boton de sonido --->
      <AppSkeleton class="w-9 h-9 !rounded-full"/>

      <!--- Boton de eliminar --->
      <AppSkeleton class="w-9 h-9 !rounded-full"/>
    </div>
    <div class="member-link">

      <!--- Imagen del pokemon --->
      <AppSkeleton class="w-24 h-24 rounded-md mx-auto"/>

      <!--- Nombre del pokemon --->
      <AppSkeleton class="w-24 h-6 mt-4 mx-auto"/>
      

      <!--- Tipos del pokemon --->
      <AppSkeleton class="w-10 h-4 mt-4 mx-auto"/>

      <!--- Barras de progreso --->
      <AppSkeleton class="w-full h-4 mt-10"/>
      <AppSkeleton class="w-full h-4 mt-4"/>
      <AppSkeleton class="w-full h-4 mt-4"/>
      <AppSkeleton class="w-full h-4 mt-4"/>
      <AppSkeleton class="w-full h-4 mt-4"/>
      <AppSkeleton class="w-full h-4 mt-4"/>
    </div>
  </article>
</template>

<style lang="postcss">
</style>
