import { defineStore } from "pinia";
import { ref } from "vue";
import type { Pokemon } from "@/types/Pokemon";
import { isPokemon } from "@/types/guards/PokemonGuard";

interface UserTeam {
  max: number;
  members: {
    basicData: Pokemon[];
    detailedData: Pokemon[];
  }
}

export const useTeamStore = defineStore("team", () => {

  const userTeam = ref<UserTeam>({
    max: 6,
    members: {
      basicData: loadUserTeam(),
      detailedData: [],
    }
  });

  function loadUserTeam(): Pokemon[] {
    try {
      const storedData = localStorage.getItem("userTeam");
      if (storedData) {
        const parsedData = JSON.parse(storedData);

        if (Array.isArray(parsedData) && parsedData.every(isPokemon)) {
          return parsedData;
        } else {
          localStorage.removeItem("userTeam");
        }
      }
    } catch (error) {
      localStorage.removeItem("userTeam");
    }
    return [];
  };

  function isTeamMember(pokemon: Pokemon) {
    return userTeam.value.members.basicData.some((p) => p.id === pokemon.id);
  };

  function toggleTeamMember(pokemon: Pokemon) {
    if (!pokemon) return;
    const index = userTeam.value.members.basicData.findIndex((p) => p.id === pokemon.id);
    console.log(index);

    if (index !== -1) {
      userTeam.value.members.basicData.splice(index, 1);
      userTeam.value.members.detailedData.splice(index, 1);
    } else {
      if (userTeam.value.members.basicData.length >= userTeam.value.max) return;
      userTeam.value.members.basicData.push(pokemon);
    }
    localStorage.setItem("userTeam", JSON.stringify(userTeam.value.members.basicData));
  }

  return {
    userTeam,

    isTeamMember,
    toggleTeamMember,
  };
});