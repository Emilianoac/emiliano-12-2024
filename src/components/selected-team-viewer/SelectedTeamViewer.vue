<script lang="ts" setup>
  import { useTeamStore } from "@/stores/team";
  import SelectedTeamViewerItems from "@/components/selected-team-viewer/SelectedTeamViewerItems.vue";

  const teamStore = useTeamStore();
</script>

<template>
  <div class="team-list">
    <div class="team-list-header">
      <p class="team-list-title">Mi equipo</p>
      <span> {{ teamStore.userTeam.members.basicData.length }} / 6</span>
    </div>
    <ul class="team-list-body">
      <SelectedTeamViewerItems/>
    </ul>
  </div>
</template>

<style lang="postcss" scoped>
  .team-list {
    @apply w-fit;
    @apply fixed bottom-5 left-[50%] transform translate-x-[-50%] z-[1000];
    @apply bg-white dark:bg-gray-900 shadow-lg;
    @apply rounded-lg;
    @apply text-center;
    @apply p-2;
  }

  .team-list-header {
    @apply flex justify-between items-center;

    .team-list-title {
      @apply text-sm font-semibold;
    }

    span {
      @apply text-xs;
    }
  }

  .team-list-body {
    @apply flex gap-2 justify-center items-center mt-2;
  }
</style>
