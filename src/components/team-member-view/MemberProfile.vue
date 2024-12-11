<script lang="ts" setup>
import AppProgressBar from "@/components/AppProgressBar.vue";
import AppTag from "@/components/AppTag.vue";
import AppSoundbutton from "@/components/AppSoundbutton.vue";
import type { Pokemon, Evolution } from "@/types/Pokemon";

defineProps<{
  pokemon: Pokemon | null;
  description: string | null;
  evolutions: Evolution[];
}>();

</script>

<template>
  <article class="member-profile-card" v-if="pokemon">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <h1 class="member-title">{{ pokemon.name }}</h1>
        <div class="relative">
          <img class="member-photo" :src="pokemon.front_default" />
          <AppSoundbutton 
            class="absolute top-1 right-1"
            v-if="pokemon.cries?.latest" 
            :sound-data="pokemon.cries?.latest"
          />
        </div>

        <div class="mt-2">
          <AppTag 
            v-for="type in pokemon?.types" 
            :key="type.type.name" 
            :tag="type.type.name"
          />
        </div>
      </div>
      
      <div>
        <div>
          <h2>Descripción</h2>
          <p class="text-sm">
            {{ description }}
          </p>
        </div>

        <hr class="my-4" />

        <div v-if="pokemon.height">
          <h2>Altura</h2>
          <p>{{ pokemon?.height * 10 }} CM</p>
        </div>

        <hr class="my-4"/>

        <div v-if="pokemon.weight">
          <h2>Peso</h2>
          <p>{{ pokemon?.weight / 10 }} KG</p>
        </div>

        <hr class="my-4 block md:hidden"/>
      </div>

      <div>
        <div>
          <h2>Stats</h2>
          <AppProgressBar 
            v-for="stat in pokemon.stats" 
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
      <ul 
        class="evolutions" 
        v-if="evolutions.length > 1">
          <li 
            v-for="(evolution, index) in evolutions" 
            :key="evolution.name"
            class="evolution-step">
              <div class="evolution-content">
                <img :src="evolution?.sprite" alt="evolution sprite"/>
                <p>{{ evolution?.name }}</p>
              </div>
              <div 
                v-if="index < evolutions.length - 1"
                class="evolution-connector">
                  <span class="arrow">→</span>
              </div>
          </li>
      </ul>
      <p class="text-semibold opacity-50" v-else>No hay evoluciones para este Pokémon.</p>
    </div>
  </article>
</template>

<style lang="postcss">

.member-profile-card {
  @apply max-w-[800px] mx-auto;
  @apply p-4;
  @apply bg-white dark:bg-gray-800 rounded-md shadow-md;

  .member-title {
    @apply text-center md:text-start text-xl md:text-2xl font-bold first-letter:uppercase;
  }

  .member-photo {
    @apply w-52 h-52 mx-auto p-2;
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
}
</style>
