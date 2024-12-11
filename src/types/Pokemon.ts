
import type { Ability, Cries, Type, Stat } from "./PokemonAPI";

export interface Pokemon {
  id: number;
  name: string;
  height?: number;
  weight?: number;
  front_default?: string;
  cries?: Cries;
  types?: Type[];
  stats: Stat[];
  abilities?: Ability[];
}

export interface Evolution {
  name: string;
  sprite: string;
}