import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { hasOmdbKey, movieDetail, omdb } from '@/lib/omdb';
import type { SearchResult } from '@/lib/types';

export async function GET(request: NextRequest) {
  if (!hasOmdbKey()) return NextResponse.json({ error: 'Falta configurar OMDB_API_KEY en .env.local.' }, { status: 503 });
  const q = request.nextUrl.searchParams.get('q')?.trim() ?? '';
  const id = request.nextUrl.searchParams.get('id');
  const type = request.nextUrl.searchParams.get('type') ?? '';
  const page = request.nextUrl.searchParams.get('page') ?? '1';
  if (id && !/^tt\d{7,12}$/.test(id)) return NextResponse.json({ error: 'ID no válido.' }, { status: 400 });
  if (!id && (q.length < 3 || q.length > 100 || !['', 'movie', 'series'].includes(type) || !/^[1-9]\d?$|^100$/.test(page))) return NextResponse.json({ error: 'Escribe entre 3 y 100 caracteres y usa filtros válidos.' }, { status: 400 });
  try {
    const data = id ? await movieDetail(id) : await omdb<SearchResult>({ s: q, page, ...(type ? { type } : {}) });
    return NextResponse.json(data, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    const timeout = axios.isAxiosError(error) && error.code === 'ECONNABORTED';
    return NextResponse.json({ error: timeout ? 'OMDb tardó demasiado. Inténtalo nuevamente.' : 'No se pudo conectar con OMDb. Revisa tu conexión e inténtalo de nuevo.' }, { status: 502 });
  }
}
