
export interface Pokemon {
  id: number;
  name: string;
  front_default: string;
  cries?: string;
  types?: string[];
  abilities?: string[];
}