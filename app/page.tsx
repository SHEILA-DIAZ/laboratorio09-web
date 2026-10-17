import MovieCard from '@/components/MovieCard';
import MovieSearch from '@/components/MovieSearch';
import { featuredMovies, hasOmdbKey } from '@/lib/omdb';
import type { Movie } from '@/lib/types';

export const dynamic = 'force-dynamic';
export default async function Home({ searchParams }: { searchParams: Promise<{ movie?: string }> }) {
  const { movie } = await searchParams;
  let movies: Movie[] = [];
  let error = '';
  const configured = hasOmdbKey();
  if (configured) {
    try { movies = await featuredMovies(); } catch { error = 'No pudimos cargar la selección de OMDb. Revisa la clave y la conexión, y recarga la página.'; }
  }
  return <>
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(ellipse_at_top_right,#374126_0%,#1d2420_35%,#171b1e_70%)] p-8 md:p-14">
      <span className="tag">TU PRÓXIMA HISTORIA EMPIEZA AQUÍ</span>
      <p className="mt-9 text-xs uppercase tracking-[.3em] text-zinc-400">Películas & series / Selección de cine</p>
      <h1 className="mt-4 max-w-3xl text-5xl leading-[1.05] font-black tracking-tight md:text-7xl">Siempre hay algo<br /><span className="text-[#c7ed78]">por descubrir.</span></h1>
      <p className="mt-6 max-w-lg leading-7 text-zinc-300">Encuentra esa película que tienes pendiente. Explora historias, descubre el reparto y elige qué ver después.</p>
      <a className="action mt-8 inline-block" href="#busqueda">Explorar el catálogo ↗</a>
      <div className="mt-10 flex gap-6 text-xs text-zinc-400"><span>01 / Explora</span><span>02 / Descubre</span><span>03 / Disfruta</span></div>
    </section>
    {!configured && <p role="status" className="notice mt-6">Para mostrar el catálogo real, copia <code>.env.example</code> a <code>.env.local</code>, agrega tu clave OMDb y reinicia el servidor. Solicítala en <a className="underline" href="https://www.omdbapi.com/apikey.aspx" target="_blank" rel="noreferrer">OMDb</a>.</p>}
    <section className="mt-12" aria-labelledby="featured"><div className="mb-6 flex flex-wrap items-end justify-between gap-3"><div><p className="mb-2 text-xs tracking-widest text-zinc-400">LA SELECCIÓN DE PLANO</p><h2 id="featured" className="text-3xl font-bold">Universo Marvel</h2></div><span className="tag">SSR · Desde el servidor</span></div>
      <p className="muted mb-6 text-sm">Títulos conocidos encontrados por nombre. OMDb no ofrece un ranking de popularidad.</p>
      {error && <p role="alert" className="notice">{error}</p>}
      {movies.length > 0 ? <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">{movies.map(item => <MovieCard key={item.imdbID} movie={item} />)}</div> : !error && <div className="panel text-zinc-400">El catálogo aparecerá aquí al configurar OMDb.</div>}
    </section>
    <MovieSearch initialId={movie && /^tt\d{7,12}$/.test(movie) ? movie : undefined} />
  </>;
}
