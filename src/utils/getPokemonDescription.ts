import axios from "axios";

export default async function getPokemoDescription(pokemonId: number): Promise<string | null> {
  try {
    const speciesRes = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);

    const flavorTexts = speciesRes.data.flavor_text_entries;
    const entry = flavorTexts.find((text: any) => text.language.name === "es");

    return entry ? entry.flavor_text.replace(/\n|\f/g, " ") : null;
  } catch (err) {
    return null;
  }
}
