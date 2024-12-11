import { defineStore } from "pinia";
import { ref } from "vue";
import loadUserTeam from "@/utils/loadUserTeam";
import axios from "axios";
import getPokemonEvolutions from "@/utils/getPokemonEvolutions";
import getPokemoDescription from "@/utils/getPokemonDescription";
import type { PokemonAPI } from "@/types/PokemonAPI";
import type { Pokemon, Evolution } from "@/types/Pokemon";

interface UserTeam {
  max: number;
  members: {
    basicData: Pokemon[];
    detailedData: Pokemon[];
  }
}

interface SingleTeamMember {
  pokemon: Pokemon | null;
  evolutions: Evolution[];
  description: string | null;
}

export const useTeamStore = defineStore("team", () => {
  const userTeam = ref<UserTeam>({
    max: 6,
    members: {
      basicData: loadUserTeam(),
      detailedData: [],
    }
  });

  const singleTeamMember = ref<SingleTeamMember >({
    pokemon: null,
    evolutions: [],
    description: null
  });

  const isLoading = ref(false);

  function isTeamMember(pokemon: Pokemon) {
    return userTeam.value.members.basicData.some((p) => p.id === pokemon.id);
  };

  async function updateSingleTeamMemberData(id: number) {
    isLoading.value = true;
    const pokemon = userTeam.value.members.basicData.find((p) => p.id == id);

    if (pokemon) {
      const data = await fetchPokemonDetails(id);
      singleTeamMember.value.pokemon = data;

      await updateSingleTeamMemberEvolutions(id);
      await updateSingleTeamMemberDescription(id);

      isLoading.value = false;
    } else {
      singleTeamMember.value.pokemon = null;
    }
  };

  async function updateSingleTeamMemberEvolutions(id: number) {
    const evolutions = await getPokemonEvolutions(id);
    singleTeamMember.value.evolutions = evolutions;
  };

  async function updateSingleTeamMemberDescription(id: number) {
    const description = await getPokemoDescription(id);
    singleTeamMember.value.description = description;
  };

  async function getDetailedData() {
    if (!isDetailedDataOutdated()) return;

    isLoading.value = true;

    resetDetailedData();

    const memberIds = userTeam.value.members.basicData.map((p) => p.id);

    const detailedData = await Promise.all(memberIds.map(fetchPokemonDetails));

    userTeam.value.members.detailedData.push(...detailedData);

    isLoading.value = false;
  };

  function isDetailedDataOutdated() {
    const memberIds = userTeam.value.members.basicData.map((p) => p.id);
    const detailedIds = userTeam.value.members.detailedData.map((p) => p.id);

    return (
      detailedIds.length === 0 ||
      memberIds.length !== detailedIds.length ||
      !memberIds.every((id) => detailedIds.includes(id))
    );
  };

  function resetDetailedData() {
    userTeam.value.members.detailedData = [];
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
  };

  async function fetchPokemonDetails(id: number): Promise<Pokemon> {
    const res = await axios.get<PokemonAPI>(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = res.data;
    const { id: pokemonId, name, height, weight, types, sprites, cries, abilities, stats } = data;
    const { front_default } = sprites;

    return { id: pokemonId, name, height, weight, types, cries, abilities, stats, front_default};
  };

  return {
    userTeam,
    isLoading,
    singleTeamMember,

    isTeamMember,
    toggleTeamMember,
    getDetailedData,
    updateSingleTeamMemberData
  };
});