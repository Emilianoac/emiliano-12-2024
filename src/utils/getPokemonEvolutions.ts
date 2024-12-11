import axios from "axios";
import type { Evolution } from "@/types/Pokemon";

export default async function useEvolutions(pokemonId: number): Promise<Evolution[]> {
  try {
    const speciesRes = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
    const evolutionChainUrl = speciesRes.data.evolution_chain.url;
    const evolutionRes = await axios.get(evolutionChainUrl);

    const extractEvolutionData = async (chainNode: any): Promise<Evolution[]> => {
      const evolutions: Evolution[] = [];
      let currentNode = chainNode;

      while (currentNode) {
        const name = currentNode.species.name;
        const spriteRes = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const sprite = spriteRes.data.sprites.other['official-artwork'].front_default;

        evolutions.push({ name, sprite });
        currentNode = currentNode.evolves_to[0];
      }
      return evolutions;
    };

    return extractEvolutionData(evolutionRes.data.chain);
  } catch (error) {
    return [];
  }
}
