<script lang="ts" setup>
import { computed } from "vue";
import { useTeamStore } from "@/stores/team";
import IconCheck from "@/components/icons/IconCheck.vue";
import IconUnchecked from "@/components/icons/IconUnchecked.vue";
import type { PokemonBasic } from "@/types/PokemonBasic";

const teamStore = useTeamStore();

const props = defineProps<{
  pokemon: PokemonBasic;
}>();


const cardClasses = computed(() => ({
  "selected": teamStore.isTeamMember(props.pokemon),
  "disabled": !teamStore.isTeamMember(props.pokemon) && teamStore.userTeam.members.basicData.length === 6,
}));
</script>

<template>
  <article 
    class="pokemon-card"
    :class="[cardClasses]"
    @click="teamStore.toggleTeamMember(props.pokemon)"
  >
    <div class="pokemon-card-header">
      <span class="pokemon-id">#{{ props.pokemon.id }}</span>
      <div>
        <IconCheck 
          v-if="teamStore.isTeamMember(props.pokemon)" 
          :width="30" 
          :height="30" 
          class="text-green-500"
        />
        <IconUnchecked 
          v-else 
          :width="30" 
          :height="30" 
          class="text-gray-500"
        />
      </div>
    </div>
    <img 
      loading="lazy" 
      class="h-[100px] object-scale-down" 
      :src="props.pokemon.front_default" 
      alt="pokemon"
    />
    <h2 class="pokemon-card-title">{{ props.pokemon.name }}</h2>
  </article>
</template>

<style lang="postcss" scoped>
.pokemon-card {
  @apply bg-white dark:bg-gray-800 shadow-md p-4 rounded-lg;
  @apply cursor-pointer;
  @apply text-center;

  .pokemon-card-header {
    @apply flex justify-between items-center;
  }

  .pokemon-card-title {
    @apply font-bold;
    @apply first-letter:uppercase;
  }

  img {
    @apply mx-auto;
  }
}

.pokemon-card.selected {
  @apply bg-green-100 dark:bg-green-900;
}

.pokemon-card.disabled {
  @apply opacity-30;
  @apply cursor-not-allowed;
}
</style>
