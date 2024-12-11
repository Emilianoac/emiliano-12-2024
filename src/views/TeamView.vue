<script lang="ts" setup>
import { useTeamStore } from "@/stores/team";
import { computed, onMounted } from "vue";
import TeamViewCard from "@/components/team-view/TeamViewCard.vue";
import TeamViewCardSkeleton from "@/components/team-view/TeamViewCardSkeleton.vue";

const teamStore = useTeamStore();
const teamData = computed(() => teamStore.userTeam.members.detailedData);

onMounted(async () => {
  await teamStore.getDetailedData();
});
</script>

<template>
  <div class="team-view">  
    <template v-if="teamData.length || teamStore.isLoading" >

      <div class="team-view-header">
        <h1>Mi equipo</h1>
        <p v-if="teamData.length">
          <span>{{ teamData.length }}</span> / {{ teamStore.userTeam.max }} miembros
        </p>
      </div>
      
      <div class="team-grid">
        <template v-if="teamData.length">
          <TeamViewCard v-for="member in teamData" :member="member" :key="member.id"/>
        </template>
        <template v-else>
          <TeamViewCardSkeleton v-for="index in 6" :key="index"/>
        </template>
      </div>
    </template>
    <div v-else class="no-members-message">
      <p>No hay miembros en tu equipo</p>
    </div>
  </div>
</template>

<style lang="postcss" scoped>

.team-view {
  @apply my-10;

  .team-view-header {
    @apply flex justify-between items-center mb-7;

    h1 {
      @apply text-xl md:text-3xl font-bold text-center;
    }

    p {
      @apply text-sm;

      span {
        @apply font-bold;
      }
    }
  }
}

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
