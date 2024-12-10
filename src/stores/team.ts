import { defineStore } from "pinia";
import { ref } from "vue";
import type { PokemonAPI } from "@/types/PokemonAPI";
import type { Pokemon } from "@/types/Pokemon";
import { isPokemon } from "@/types/guards/PokemonGuard";
import axios from "axios";

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

  const isLoading = ref(false);

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

  async function getDetailedData() {
    if (!isDetailedDataOutdated()) return;

    isLoading.value = true;

    resetDetailedData();

    const memberIds = userTeam.value.members.basicData.map((p) => p.id);

    const detailedData = await Promise.all(memberIds.map(fetchPokemonDetails));

    userTeam.value.members.detailedData.push(...detailedData);

    isLoading.value = false;
  }

  function isDetailedDataOutdated() {
    const memberIds = userTeam.value.members.basicData.map((p) => p.id);
    const detailedIds = userTeam.value.members.detailedData.map((p) => p.id);

    return (
      detailedIds.length === 0 ||
      memberIds.length !== detailedIds.length ||
      !memberIds.every((id) => detailedIds.includes(id))
    );
  }

  function resetDetailedData() {
    userTeam.value.members.detailedData = [];
  }

  async function fetchPokemonDetails(id: number): Promise<Pokemon> {
    const res = await axios.get<PokemonAPI>(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = res.data;
    const { id: pokemonId, name, height, weight, types, sprites, cries, abilities, stats } = data;
    const { front_default } = sprites;

    return {
      id: pokemonId,
      name,
      height,
      weight,
      types,
      cries,
      abilities,
      stats,
      front_default,
    };
  }

  return {
    userTeam,
    isLoading,

    isTeamMember,
    toggleTeamMember,
    getDetailedData,
  };
});