import type { Pokemon } from '@/lib/types';
export default function PokemonView({ pokemon, mode, error, loading }: { pokemon?: Pokemon; mode: 'CSR' | 'SSR'; error?: string; loading?: boolean }) {
  return <section className="mx-auto max-w-2xl"><span className="tag">EJERCICIO 1.1</span><h1 className="my-6 text-4xl font-bold">Pokémon {mode}</h1><div className="panel text-center">
    {loading && <p role="status" className="py-16">Cargando Pokémon…</p>}
    {error && <p role="alert" className="notice">{error}</p>}
    {pokemon && <>{pokemon.sprites.front_default && <img src={pokemon.sprites.front_default} alt={pokemon.name} width={192} height={192} className="mx-auto [image-rendering:pixelated]" />}<h2 className="text-4xl font-bold capitalize">{pokemon.name}</h2><div className="mt-5 flex justify-center gap-3">{pokemon.types.map(({ type }) => <span key={type.name} className="tag">{type.name}</span>)}</div></>}
    <p className="muted mt-8 text-sm leading-6">{mode === 'CSR' ? 'Los datos se solicitan desde el navegador después del primer renderizado. Revisa la petición a PokeAPI en Network.' : 'El servidor obtiene los datos antes de enviar el HTML. Busca el nombre del Pokémon en el código fuente de la página.'}</p>
  </div></section>;
}
