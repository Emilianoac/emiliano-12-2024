export interface PokemonList {
  count: number
  next: string
  previous: string | null
  results: Result[]
}

export interface Result {
  name: string
  url: string
}
