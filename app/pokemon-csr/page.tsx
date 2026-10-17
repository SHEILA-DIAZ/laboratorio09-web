'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonView from '@/components/PokemonView';
import type { Pokemon } from '@/lib/types';
export default function PokemonCSR() {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try { const { data } = await axios.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 150) + 1}`, { signal: controller.signal, timeout: 12000 }); if (!controller.signal.aborted) setPokemon(data); }
      catch { if (!controller.signal.aborted) setError('No se pudo cargar el Pokémon. Revisa tu conexión y recarga.'); }
      finally { if (!controller.signal.aborted) setLoading(false); }
    }
    void load(); return () => controller.abort();
  }, []);
  return <PokemonView pokemon={pokemon} mode="CSR" loading={loading} error={error} />;
}
