<script lang="ts" setup>
import IconTrash from "@/components/icons/IconTrash.vue";
import { useTeamStore } from "@/stores/team";

const teamStore = useTeamStore();
</script>

<template>
  <li v-for="place in teamStore.userTeam.max" class="team-list-item">
    <template v-if="teamStore.userTeam.members.basicData[place - 1]">
      <div 
        class="list-item-delete"
        title="Eliminar"
        @click.stop="teamStore.toggleTeamMember(teamStore.userTeam.members.basicData[place - 1])">
          <IconTrash :width="20" :height="20"/>
      </div>
      <img 
        :title="teamStore.userTeam.members.basicData[place - 1].name"
        :src="teamStore.userTeam.members.basicData[place - 1].front_default" 
        alt="pokemon" 
      />
    </template>
  </li>
</template>

<style lang="postcss" scoped>
.team-list-item {
  @apply relative;
  @apply flex justify-center items-center;
  @apply w-[40px] h-[40px] md:w-[55px] md:h-[55px];
  @apply bg-slate-100 dark:bg-slate-700;
  @apply rounded-lg;
  @apply p-1 overflow-hidden;

  &:hover .list-item-delete {
    @apply opacity-100;
  }

  .list-item-delete {
    @apply transition-all duration-300;
    @apply text-white;
    @apply opacity-0;
    @apply absolute top-0 right-0;
    @apply w-full h-full;
    @apply flex justify-center items-center;
    @apply p-1;
    @apply cursor-pointer;
    @apply bg-black bg-opacity-30;
    @apply backdrop-blur-md;
  }

  img {
    @apply w-full h-[50px] ;
    @apply object-contain;
  }
}
</style>
