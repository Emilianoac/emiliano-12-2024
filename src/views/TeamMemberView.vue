<script lang="ts" setup>
import { useTeamStore } from "@/stores/team";
import { useTeamMember } from "@/composables/useTeamMember";
import MemberProfile from "@/components/team-member-view/MemberProfile.vue";
import MemberProfileSkeleton from "@/components/team-member-view/MemberProfileSkeleton.vue";

const teamStore = useTeamStore();
const { setupRouteWatcher } = useTeamMember();
setupRouteWatcher();
</script>

<template>
  <div class="member-profile">
    <MemberProfileSkeleton v-if="teamStore.isLoading" />
    <MemberProfile 
      v-else
      :pokemon="teamStore.singleTeamMember.pokemon" 
      :description="teamStore.singleTeamMember.description"
      :evolutions="teamStore.singleTeamMember.evolutions"
    />
  </div>
</template>

<style lang="postcss" scoped>
.member-profile {
  @apply py-4 pt-16;
}
</style>
