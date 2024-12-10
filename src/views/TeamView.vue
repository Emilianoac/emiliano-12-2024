<script lang="ts" setup>
import { useTeamStore } from "@/stores/team";
import { computed, onMounted } from "vue";
import TeamViewCard from "@/components/team-view/TeamViewCard.vue";
import AppSkeleton from "@/components/AppSkeleton.vue";

const teamStore = useTeamStore();
const teamData = computed(() => teamStore.userTeam.members.detailedData);

onMounted(async () => {
  await teamStore.getDetailedData();
});
</script>

<template>
  <div class="my-10">  
    <template v-if="teamData.length || teamStore.isLoading" >
      <h1 class="text-3xl font-bold mb-7 text-center">Mi equipo</h1>
      <div class="team-grid">
        <template v-if="teamData.length">
          <TeamViewCard 
            v-for="member in teamData" 
            :member="member" 
            :key="member.id" 
          />
        </template>
        <template v-else>
          <AppSkeleton
            v-for="index in 6"
            :key="index"
            class="w-full h-[400px] md:h-[500px]"
          />
        </template>
      </div>
    </template>
    <div v-else class="no-members-message">
      <p>No hay miembros en tu equipo</p>
    </div>
  </div>
</template>

<style lang="postcss" scoped>

.team-grid {
  @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4;
}

.no-members-message {
  @apply flex justify-center items-center h-[calc(100vh-200px)];

  p {
    @apply text-center text-2xl font-bold opacity-65;
  }
}
</style>
