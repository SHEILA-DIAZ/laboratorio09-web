import axios from 'axios';
import PokemonView from '@/components/PokemonView';
import type { Pokemon } from '@/lib/types';
export const dynamic = 'force-dynamic';
async function getPokemon() {
  const id = Math.floor(Math.random() * 150) + 1;
  const { data } = await axios.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`, { timeout: 12000 });
  return data;
}
export default async function PokemonSSR() {
  let pokemon: Pokemon | undefined;
  let error = '';
  try { pokemon = await getPokemon(); }
  catch { error = 'No se pudo cargar el Pokémon. Revisa tu conexión y recarga.'; }
  return <PokemonView pokemon={pokemon} mode="SSR" error={error} />;
}
