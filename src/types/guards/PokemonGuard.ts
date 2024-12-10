
import type { Pokemon } from "../Pokemon";

export function isPokemon(value : any): value is Pokemon {
  return (
    value !== null &&
    typeof value === "object" &&
    typeof value.id === "number" &&
    typeof value.name === "string" &&
    typeof value.front_default === "string"
  );
}