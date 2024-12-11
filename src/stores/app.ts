import { defineStore } from "pinia";
import { ref } from "vue";
import type { PokemonAPI } from "@/types/PokemonAPI";
import type { Result } from "@/types/PokemonListAPI";
import type { Pokemon } from "@/types/Pokemon";
import axios from "axios";

export const useAppStore = defineStore("app", () => {
  const pokemons = ref<Pokemon[]>([]);
  const pagination = ref({
    totalPages: 6,
    current: 1,
    total: 151,
  });
  const error = ref({
    status: false,
    message: "",
  })

  async function getPokemons(page: number, limit: number, offset: number) {
    if (pokemons.value.length >= pagination.value.total) return;
  
    try {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon`, {
        params: { limit, offset },
      });
  
      const promises = data.results.map(async (pokemon: Result) => {
        const { data: pokemonData } = await axios.get(pokemon.url);
        return pokemonData;
      });
      const pokemonsData = await Promise.all(promises);

      const newPokemonList = pokemonsData.map((pokemon: PokemonAPI) => {
        const { id, name, sprites } = pokemon;
        const { front_default } = sprites;
        return { id, name, front_default };
      });
  
      updatePokemons(newPokemonList);
      updateCurrentPage(page === pagination.value.totalPages ? page : page + 1);
    } catch (err) {
      error.value.status = true;
      error.value.message = "Error Obteniendo los Pokemons";
    }
  }
  
  function updatePokemons(newPokemons: Pokemon[]) {
    pokemons.value = pokemons.value.concat(newPokemons);
  }

  function updateCurrentPage(page: number) {
    pagination.value.current = page;
  }

  return {
    pokemons,
    pagination,

    getPokemons,
  }
});
