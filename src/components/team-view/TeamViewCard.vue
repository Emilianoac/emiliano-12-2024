<script lang="ts" setup>
import { useTeamStore } from "@/stores/team";
import AppProgressBar from "@/components/AppProgressBar.vue";
import type { Pokemon } from "@/types/Pokemon";
import AppSoundbutton from "@/components/AppSoundbutton.vue";
import IconTrash from "@/components/icons/IconTrash.vue";
import AppTag from "@/components/AppTag.vue";

const teamStore = useTeamStore();

defineProps<{ 
  member: Pokemon 
}>();

</script>

<template>
  <article class="member-card">
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
        <AppTag  
          v-for="type in member.types" 
          :key="type.slot" 
          :tag="type.type.name" 
        />
      </div>
  
      <AppProgressBar 
        v-for="stat in member.stats" 
        :key="stat.stat.name"
        :progress="stat.base_stat" 
        :stat-name="stat.stat.name"
      />
    </router-link>
  </article>
</template>

<style lang="postcss">

.member-card {
  @apply relative;
  @apply bg-white dark:bg-gray-800 rounded-md shadow-md;
  @apply transition-transform duration-300 ease-in-out;

  .member-card-header {
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
  }

  .member-card-actions {
    @apply flex justify-between;
  }

  &:hover {
    @apply opacity-90
  }
}
</style>
