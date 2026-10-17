import type { Movie } from '@/lib/types';
export default function MovieCard({ movie, onSelect }: { movie: Movie; onSelect?: (id: string) => void }) {
  const content = <><div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-[#272c31]">
    {movie.Poster !== 'N/A' ? <img src={movie.Poster} alt={`Póster de ${movie.Title}`} loading="lazy" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" /> : <div className="flex h-full items-center justify-center p-6 text-center text-zinc-400">Póster no disponible</div>}
    <span className="absolute left-3 top-3 rounded-md bg-black/80 px-2 py-1 text-[10px] uppercase tracking-widest">{movie.Type === 'series' ? 'Serie' : 'Película'}</span>
    </div><h3 className="mt-3 line-clamp-2 font-semibold">{movie.Title}</h3><p className="mt-1 text-sm text-zinc-400">{movie.Year} <span className="ml-2 text-[#c7ed78]">↗ Ver detalles</span></p></>;
  return onSelect ? <button onClick={() => onSelect(movie.imdbID)} className="group text-left" aria-label={`Ver detalles de ${movie.Title}`}>{content}</button> : <a href={`/?movie=${movie.imdbID}#busqueda`} className="group block">{content}</a>;
}
