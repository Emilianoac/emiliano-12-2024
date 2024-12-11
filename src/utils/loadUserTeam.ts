import type  { Pokemon } from "@/types/Pokemon";
import { isPokemon } from "@/types/guards/PokemonGuard";

export default function loadUserTeam(): Pokemon[] {
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
}
