<script lang="ts" setup>
import { useTeamStore } from "@/stores/team";
import AppProgressBar from "@/components/AppProgressBar.vue";
import type { Pokemon } from "@/types/Pokemon";
import AppSoundbutton from "@/components/AppSoundbutton.vue";
import IconTrash from "@/components/icons/IconTrash.vue";

const teamStore = useTeamStore();

defineProps<{ 
  member: Pokemon 
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
  <article class="member-card" :key="member.id">
    <div class="member-card-header">
      <AppSoundbutton :sound-data="member.cries?.latest"/>
      <button 
        class="delete-button" 
        title="Eliminar miembro del equipo"
        @click="teamStore.toggleTeamMember(member)">
        <IconTrash :width="24" :height="24" />
      </button>
    </div>
    <router-link 
      class="member-link" 
      :to="{ name: 'team-member', params: { id: member.id.toString() } }">
      <img class="member-card-image" :src="member.front_default" :alt="member.name" />
      <h2 class="member-card-name">{{ member.name }}</h2>
  
      <div class="member-card-types">
        <span 
          class="first-letter:uppercase"
          v-for="type in member.types" 
          :key="type.slot">
            {{ type.type.name }}
        </span>
      </div>
  
      <div class="member-card-stats">
        <div 
          class="member-stat mb-3" 
          v-for="stat in member.stats" 
          :key="stat.stat.name">
            <p class="first-letter:uppercase text-sm font-semibold mb-1">
              {{ stat.stat.name }}: {{ stat.base_stat }}
            </p>
            <AppProgressBar 
              :progress="stat.base_stat" 
              :color="statColors[stat.stat.name]"
            />
        </div>
      </div>
    </router-link>
  </article>
</template>

<style lang="postcss" scoped>

.member-card {
  @apply relative;
  @apply bg-white dark:bg-gray-800 rounded-md shadow-md;
  @apply transition-transform duration-300 ease-in-out;

  .member-card-header {
    @apply absolute top-0 right-0;
    @apply flex justify-between w-full;
    @apply p-2;

    .delete-button {
      @apply h-9 w-9;
      @apply flex items-center justify-center;
      @apply bg-gray-200 dark:bg-gray-700 rounded-full p-2;

      &:hover {
        @apply bg-gray-300 dark:bg-gray-600;
      }

      &:active {
        transform: scale(0.9);
      }
    }
  }

  .member-link {
    @apply p-4 block;
  }

  .member-card-image {
    @apply w-24 h-24 mx-auto mt-4;
  }

  .member-card-name {
    @apply text-center text-2xl font-bold first-letter:uppercase;
  }

  .member-card-types {
    @apply flex justify-center my-4;
    span {
      @apply inline-block;
      @apply bg-gray-200 dark:bg-gray-700;
      @apply px-2 py-1 rounded-md mr-2;
      @apply text-xs first-letter:uppercase font-semibold;
    }
  }

  .member-card-actions {
    @apply flex justify-between;
  }

  &:hover {
    @apply opacity-90
  }
}
</style>
