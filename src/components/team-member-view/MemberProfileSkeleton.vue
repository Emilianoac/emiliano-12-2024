<script lang="ts" setup>
import AppSkeleton from "@/components/AppSkeleton.vue";
</script>

<template>
  <article class="member-profile-card">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <!--Titulo -->
        <AppSkeleton class="w-full h-[20px] mb-4"/>

        <!--Imagen -->
        <AppSkeleton class="w-full h-[200px]"/>

        <!--Tipos -->
        <div class="mt-2">
          <AppSkeleton class="w-[90px] h-[20px]"/>
        </div>
      </div>
      
      <div>
        <!--Descripción -->
        <div>
          <AppSkeleton class="w-[80px] h-[20px] mb-2"/>
          <AppSkeleton class="w-full h-[80px]"/>
        </div>

        <hr class="my-4" />

        <!--Altura -->
        <div>
          <AppSkeleton class="w-[80px] h-[20px] mb-2"/>
          <AppSkeleton class="w-full h-[20px]"/>
        </div>

        <hr class="my-4"/>

        <!--Peso -->
        <div>
          <AppSkeleton class="w-[80px] h-[20px] mb-2"/>
          <AppSkeleton class="w-full h-[20px]"/>
        </div>

        <hr class="my-4 block md:hidden"/>
      </div>

      <div>
        <!--Habilidades -->
        <div>
          <AppSkeleton class="w-[80px] h-[20px] mb-2"/>
          <AppSkeleton class="w-full h-[20px] mb-2"/>
          <AppSkeleton class="w-full h-[20px] mb-2"/>
          <AppSkeleton class="w-full h-[20px] mb-2"/>
          <AppSkeleton class="w-full h-[20px] mb-2"/>
          <AppSkeleton class="w-full h-[20px] mb-2"/>
          <AppSkeleton class="w-full h-[20px] mb-2"/>
        </div>
      </div>
    </div>
      
    <hr class="my-4"/>

    <div>
      <!--EVoluciones -->
      <AppSkeleton class="w-[80px] h-[20px] mb-2"/>
      <AppSkeleton class="w-full h-[50px]"/>
    </div>
  </article>
</template>

<style lang="postcss">
</style>
