'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import MoviePoster from './MoviePoster';
import type { Movie, MovieDetail, SearchResult } from '@/lib/types';

export default function MovieSearch({ initialId }: { initialId?: string }) {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(initialId ?? '');
  const [detail, setDetail] = useState<MovieDetail | null>(null);
  const [detailError, setDetailError] = useState('');
  const [detailLoading, setDetailLoading] = useState(Boolean(initialId));

  useEffect(() => {
    if (query.trim().length < 3) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const { data } = await axios.get<SearchResult>('/api/movies', { params: { q: query.trim(), type, page }, signal: controller.signal });
        if (!controller.signal.aborted) {
          setMovies(data.Search ?? []); setTotal(Number(data.totalResults ?? 0));
          setError(data.Response === 'False' ? (data.Error || 'No se encontraron resultados.') : '');
        }
      } catch (err) {
        if (!controller.signal.aborted) { setMovies([]); setTotal(0); setError(axios.isAxiosError(err) ? err.response?.data?.error || 'No se pudo completar la búsqueda.' : 'Error inesperado.'); }
      } finally { if (!controller.signal.aborted) setLoading(false); }
    }, 450);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [query, type, page]);

  useEffect(() => {
    if (!selected) return;
    const controller = new AbortController();
    async function load() {
      try {
        const { data } = await axios.get<MovieDetail & { Response: string; Error?: string }>('/api/movies', { params: { id: selected }, signal: controller.signal });
        if (!controller.signal.aborted) {
          if (data.Response === 'False') setDetailError(data.Error || 'No hay detalles disponibles.');
          else setDetail(data);
        }
      } catch (err) { if (!controller.signal.aborted) setDetailError(axios.isAxiosError(err) ? err.response?.data?.error || 'No se pudieron obtener los detalles.' : 'Error inesperado.'); }
      finally { if (!controller.signal.aborted) setDetailLoading(false); }
    }
    void load();
    return () => controller.abort();
  }, [selected]);

  function resetSearch() { setPage(1); setMovies([]); setTotal(0); setError(''); }
  function choose(id: string) { if (id === selected) return; setDetail(null); setDetailError(''); setDetailLoading(true); setSelected(id); }
  return <section id="busqueda" className="mt-14 scroll-mt-8">
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3"><div><p className="mb-2 text-xs tracking-widest text-zinc-400">A TU MANERA</p><h2 className="text-3xl font-bold">Encuentra tu próxima favorita</h2></div><span className="tag">CSR · Búsqueda interactiva</span></div>
    <div className="panel"><div className="grid gap-4 md:grid-cols-[1fr_220px]">
      <div><label htmlFor="query" className="mb-2 block text-sm text-zinc-300">Título de la película o serie</label><input id="query" className="field" maxLength={100} placeholder="Prueba con Batman, Suits, Interstellar…" value={query} onChange={e => { setQuery(e.target.value); resetSearch(); setLoading(e.target.value.trim().length >= 3); }} /></div>
      <div><label htmlFor="type" className="mb-2 block text-sm text-zinc-300">Formato</label><select id="type" className="field" value={type} onChange={e => { setType(e.target.value); resetSearch(); setLoading(query.trim().length >= 3); }}><option value="">Todos los títulos</option><option value="movie">Películas</option><option value="series">Series</option></select></div>
    </div><p className="muted mt-3 text-xs">Escribe al menos 3 caracteres. Los resultados se actualizan sin recargar la página.</p></div>
    <div aria-live="polite" aria-busy={loading} className="mt-6">
      {loading && <p className="muted py-8">Buscando en OMDb…</p>}
      {!loading && error && <p role="alert" className="notice">{error}</p>}
      {!loading && total > 0 && <p className="muted mb-5 text-sm">{total} resultados · Página {page}</p>}
      {!loading && <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">{movies.map(item => <MovieCard key={item.imdbID} movie={item} onSelect={choose} />)}</div>}
      {!loading && total > 10 && <div className="mt-8 flex items-center justify-center gap-5"><button className="action" disabled={page === 1} onClick={() => { setPage(page - 1); setLoading(true); }}>Anterior</button><span>{page} / {Math.min(100, Math.ceil(total / 10))}</span><button className="action" disabled={page >= Math.min(100, Math.ceil(total / 10))} onClick={() => { setPage(page + 1); setLoading(true); }}>Siguiente</button></div>}
    </div>
    {selected && <article aria-labelledby="detail-title" aria-busy={detailLoading} className="panel mt-8"><div className="mb-5 flex items-center justify-between gap-4"><h3 id="detail-title" className="text-2xl font-bold">Ficha del título</h3><button className="rounded-lg border border-zinc-500 px-4 py-2" onClick={() => { setSelected(''); setDetail(null); }}>Cerrar</button></div>
      {detailLoading && <p role="status">Cargando detalles…</p>}{detailError && <p role="alert" className="notice">{detailError}</p>}
      {detail && <div className="grid gap-8 md:grid-cols-[200px_1fr]"><MoviePoster src={detail.Poster} title={detail.Title} className="aspect-[2/3] w-full max-w-[200px] self-start rounded-xl object-cover" /><div><span className="tag">{detail.Type} · {detail.Year}</span><h4 className="mt-4 text-3xl font-bold">{detail.Title}</h4><p className="mt-3 text-[#c7ed78]">★ {detail.imdbRating} / 10 · {detail.Runtime} · {detail.Rated}</p><p className="mt-5 leading-7 text-zinc-300">{detail.Plot}</p><dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">{Object.entries({ Género: detail.Genre, Dirección: detail.Director, Reparto: detail.Actors, Estreno: detail.Released, Idioma: detail.Language, País: detail.Country, Premios: detail.Awards, ...(detail.totalSeasons ? { Temporadas: detail.totalSeasons } : {}) }).map(([label, value]) => <div key={label}><dt className="muted">{label}</dt><dd className="mt-1">{value || 'No disponible'}</dd></div>)}</dl></div></div>}
    </article>}
  </section>;
}
