import { useTeamStore } from "@/stores/team";
import { useRouter, useRoute } from "vue-router";
import { onMounted, watch } from "vue";

export function useTeamMember() {
  const teamStore = useTeamStore();
  const router = useRouter();
  const route = useRoute();

  const fetchTeamMember = async (id: string | null | undefined) => {
    const teamMemberId = Number(id);

    if (isNaN(teamMemberId)) {
      router.push({ name: "team" });
      return;
    }

    try {
      await teamStore.updateSingleTeamMemberData(teamMemberId);

      if (!teamStore.singleTeamMember.pokemon) {
        router.push({ name: "team" });
      }

      const name = teamStore.singleTeamMember.pokemon?.name;
      name ? document.title = `${name.charAt(0).toUpperCase() + name.slice(1)} - PokeApp` : document.title = "Miembro del equipo - PokeApp";

    } catch (error) {
      console.error("Error fetching team member:", error);
      router.push({ name: "team" });
    }
  };

  const setupRouteWatcher = () => {
    watch(() => route.params.id, (id) => {
      fetchTeamMember(id as string);
    });

    onMounted(() => {
      fetchTeamMember(route.params.id as string);
    });
  };

  return { fetchTeamMember, setupRouteWatcher };
}
