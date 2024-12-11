<script lang="ts" setup>
import { useTeamStore } from "@/stores/team";
import { useTeamMember } from "@/composables/useTeamMember";
import AppProgressBar from "@/components/AppProgressBar.vue";
import AppTag from "@/components/AppTag.vue";
import AppSkeleton from "@/components/AppSkeleton.vue";
import AppSoundbutton from "@/components/AppSoundbutton.vue";

const teamStore = useTeamStore();
const { setupRouteWatcher } = useTeamMember();
setupRouteWatcher();
</script>

<template>
  <div class="member-profile">
    <div v-if="teamStore.singleTeamMember.pokemon" class="member-profile-container">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h1 class="member-title">{{ teamStore.singleTeamMember.pokemon?.name }}</h1>
          <div class="relative">
            <img class="member-photo" :src="teamStore.singleTeamMember.pokemon?.front_default" />
            <AppSoundbutton 
              class="absolute top-1 right-1"
              v-if="teamStore.singleTeamMember.pokemon?.cries?.latest" 
              :sound-data="teamStore.singleTeamMember.pokemon?.cries?.latest"
            />
          </div>

          <div class="mt-2">
            <AppTag 
              v-for="type in teamStore.singleTeamMember.pokemon?.types" 
              :key="type.type.name" 
              :tag="type.type.name"
            />
          </div>
        </div>
        
        <div>
          <div>
            <h2>Descripción</h2>
            <AppSkeleton 
              v-if="teamStore.isLoading" 
              class="w-full h-[80px] bg-gray-200 dark:bg-gray-700"
            />
            <p v-else class="text-sm">
              {{ teamStore.singleTeamMember.description }}
            </p>
          </div>

          <hr class="my-4" />

          <div v-if="teamStore.singleTeamMember.pokemon.height">
            <h2>Altura</h2>
            <p>{{ teamStore.singleTeamMember.pokemon?.height * 10 }} CM</p>
          </div>

          <hr class="my-4"/>

          <div v-if="teamStore.singleTeamMember.pokemon.weight">
            <h2>Peso</h2>
            <p>{{ teamStore.singleTeamMember.pokemon?.weight / 10 }} KG</p>
          </div>

          <hr class="my-4 block md:hidden"/>
        </div>

        <div>
          <div>
            <h2>Stats</h2>
            <AppProgressBar 
              v-for="stat in teamStore.singleTeamMember.pokemon?.stats" 
              :key="stat.stat.name"
              :progress="stat.base_stat"
              :stat-name="stat.stat.name" 
              />
          </div>
        </div>
      </div>
        
      <hr class="my-4"/>

      <div>
        <h2 class="text-xl font-bold mb-3">Evoluciones</h2>
        <AppSkeleton 
          v-if="teamStore.isLoading" 
          class="w-full h-[100px] bg-gray-200 dark:bg-gray-700"
        />
        <ul 
          class="evolutions" 
          v-else-if="teamStore.singleTeamMember.evolutions.length > 1">
            <li 
              v-for="(evolution, index) in teamStore.singleTeamMember.evolutions" 
              :key="evolution.name"
              class="evolution-step">
                <div class="evolution-content">
                  <img :src="evolution?.sprite" alt="evolution sprite"/>
                  <p>{{ evolution?.name }}</p>
                </div>
                <div 
                  v-if="index < teamStore.singleTeamMember.evolutions.length - 1"
                  class="evolution-connector">
                    <span class="arrow">→</span>
                </div>
            </li>
        </ul>
        <p class="text-semibold opacity-50" v-else>No hay evoluciones para este Pokémon.</p>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>

.member-profile {
  @apply py-4 pt-16;

  .member-profile-container {
    @apply max-w-[800px] mx-auto;
    @apply p-4;
    @apply bg-white dark:bg-gray-800 rounded-md shadow-md;
  }

  
  .member-title {
    @apply text-center md:text-start text-xl md:text-2xl font-bold first-letter:uppercase;
  }

  .member-photo {
    @apply w-52 h-52 mx-auto;
  }

  .member-stats {
    @apply list-none p-0 mb-4;

  }

  h2 {
    @apply font-bold;
  }

  hr {
    @apply dark:border-gray-700 border-gray-200 my-4;
  }
}

.evolutions {
  @apply flex justify-start items-center;
  @apply overflow-x-auto;

  .evolution-step {
    @apply flex items-center text-center;
  }

  .evolution-content {
    @apply flex flex-col items-center;
  }

  .evolution-content img {
    @apply w-8 h-8 md:w-12 md:h-12 object-cover;
  }

  .evolution-content p {
    @apply mt-2 text-sm first-letter:uppercase;
  }

  .evolution-connector {
    @apply mx-2 md:mx-4;
  }

  .evolution-connector .arrow {
    @apply text-xl md:text-2xl text-gray-600;
  }
}
</style>
