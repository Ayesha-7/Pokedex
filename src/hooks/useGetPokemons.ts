import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

export interface Pokemon {
  id: string;
  name: string;
  types?: string[];
  sprite?: string;
  number?: string;
}

export interface PokemonDetail extends Pokemon {
  weight?: number;
  height?: number;
  stats?: { name: string; base_stat: number }[];
  capture_rate?: number;
}

export const GET_POKEMONS = gql`
  query GetPokemons($search: String) {
    pokemon(
      limit: 151
      order_by: { id: asc }
      where: {
        pokemonspecy: {
          pokemonspeciesnames: { language: { name: { _eq: "en" } }, name: { _regex: $search } }
        }
      }
    ) {
      id
      pokemonspecy {
        pokemonspeciesnames(where: { language: { name: { _eq: "en" } } }) {
          name
        }
      }
      pokemonsprites {
        sprites(path: "other.official-artwork.front_default")
      }
      pokemontypes {
        type {
          typenames(where: { language: { name: { _eq: "en" } } }) {
            name
          }
        }
      }
    }
  }
`;

export const GET_POKEMON_DETAILS = gql`
  query GetPokemonDetails($id: Int!) {
    pokemon(where: { id: { _eq: $id } }) {
      id
      pokemonspecy {
        pokemonspeciesnames(where: { language: { name: { _eq: "en" } } }) {
          name
        }
        capture_rate
      }
      pokemonsprites {
        sprites(path: "other.official-artwork.front_default")
      }
      pokemontypes {
        type {
          typenames(where: { language: { name: { _eq: "en" } } }) {
            name
          }
        }
      }
      weight
      height
      pokemonstats {
        base_stat
        stat {
          name
        }
      }
    }
  }
`;

// Search should be done client-side for the mid-level assessment. Uncomment for the senior assessment.
export const useGetPokemons = (/* search?: string */): {
  data: Pokemon[];
  loading: boolean;
  error: useQuery.Result['error'];
} => {
  const { data, loading, error } = useQuery<{ pokemon: any[] }>(GET_POKEMONS, {
    variables: {
      search: '', // `.*${search}.*`,
    },
  });

  return {
    data:
      data?.pokemon?.map(
        (p): Pokemon => ({
          id: p.id,
          name: p.pokemonspecy.pokemonspeciesnames?.[0]?.name,
          types:
            p.pokemontypes?.map((t: any) => t?.type?.typenames?.[0]?.name)?.filter(Boolean) ?? [],
          sprite: p.pokemonsprites?.[0]?.sprites ?? undefined,
          number: p.id,
        }),
      ) ?? [],
    loading,
    error,
  };
};

export const useGetPokemonDetails = (
  id?: number,
): {
  data: PokemonDetail;
  loading: boolean;
  error: useQuery.Result['error'];
} => {
  const { data, loading, error } = useQuery<{ pokemon: any[] }>(GET_POKEMON_DETAILS, {
    variables: { id },
    skip: !id,
  });

  return {
    data: data?.pokemon?.[0]
      ? {
          id: data.pokemon[0].id,
          name: data.pokemon[0].pokemonspecy?.pokemonspeciesnames?.[0]?.name,
          capture_rate: data.pokemon[0].pokemonspecy?.capture_rate,
          sprite: data.pokemon[0].pokemonsprites?.[0]?.sprites,
          types: data.pokemon[0].pokemontypes?.map((t: any) => t?.type?.typenames?.[0]?.name) ?? [],
          number: data.pokemon[0].id,
          weight: data.pokemon[0].weight,
          height: data.pokemon[0].height,
          stats:
            data.pokemon[0].pokemonstats?.map((s: any) => ({
              name: s.stat?.name,
              base_stat: s.base_stat,
            })) ?? [],
        }
      : ({} as PokemonDetail),
    loading,
    error,
  };
};
