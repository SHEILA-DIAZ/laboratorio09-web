import 'server-only';
import axios from 'axios';
import type { MovieDetail, SearchResult } from './types';

export function hasOmdbKey() { return Boolean(process.env.OMDB_API_KEY?.trim()); }
export async function omdb<T>(params: Record<string, string>): Promise<T> {
  const apikey = process.env.OMDB_API_KEY?.trim();
  if (!apikey) throw new Error('Configura OMDB_API_KEY en .env.local y reinicia el servidor.');
  const { data } = await axios.get<T>('https://www.omdbapi.com/', { params: { ...params, apikey }, timeout: 12000 });
  return data;
}
export async function featuredMovies() {
  const data = await omdb<SearchResult>({ s: 'marvel', type: 'movie', page: '1' });
  if (data.Response === 'False') throw new Error(data.Error || 'No se pudo obtener la selección.');
  return data.Search ?? [];
}
export async function movieDetail(id: string) {
  return omdb<MovieDetail & { Response: string; Error?: string }>({ i: id, plot: 'full' });
}
