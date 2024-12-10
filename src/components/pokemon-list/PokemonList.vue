<script lang="ts" setup>
import { onMounted, computed } from "vue";
import { useAppStore } from "@/stores/app";
import PokemonListItem from "@/components/pokemon-list/PokemonListItem.vue";
import AppSkeleton from "@/components/AppSkeleton.vue";
import { useInfiniteScroll } from "@/composables/useInfiniteScroll";

const appStore = useAppStore();
const { isLoading } = useInfiniteScroll(loadMorePokemons);

async function loadMorePokemons() {
  const totalPages = appStore.pagination.totalPages;
  const currentPage = appStore.pagination.current;

  if (currentPage > totalPages) return;

  const isLastPage = currentPage === totalPages;
  const limit = isLastPage ? 26 : 25;
  const offset = (currentPage - 1) * 25;

  await appStore.getPokemons(currentPage, limit, offset);
};

onMounted(async () => {
  await appStore.getPokemons(1,25,0);
});
</script>

<template>
  <div class="pokemon-list">
    <PokemonListItem
      v-for="(pokemon) in appStore.pokemons"
      :key="pokemon.id"
      :pokemon="pokemon"
    />
    <template v-if="isLoading || !appStore.pokemons.length">
      <AppSkeleton v-for="i in 25" :key="i" class="w-full h-[200px]"/>
    </template> 
  </div>
</template>

<style lang="postcss" scoped>
.pokemon-list {
  @apply grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4;
  @apply py-4 pb-28;
}

.loading {
  @apply text-center col-span-7 mt-4;
}
</style>
