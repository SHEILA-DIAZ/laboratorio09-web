'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { cities, weatherUrl } from '@/lib/weather';
import type { Weather } from '@/lib/types';
export default function ClientWeatherWidget() {
  const [city, setCity] = useState<keyof typeof cities>('Tokyo');
  const [weather, setWeather] = useState<Weather>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try { const coords = cities[city]; const { data } = await axios.get<Weather>(weatherUrl(coords.lat, coords.lon), { signal: controller.signal, timeout: 12000 }); if (!controller.signal.aborted) setWeather(data); }
      catch { if (!controller.signal.aborted) setError('No se pudo consultar el clima. Cambia de ciudad o recarga.'); }
      finally { if (!controller.signal.aborted) setLoading(false); }
    }
    void load(); return () => controller.abort();
  }, [city]);
  return <section className="panel"><span className="tag">CSR · Mundo</span><h2 className="my-5 text-2xl font-bold">Elige una ciudad</h2><label htmlFor="city" className="mb-2 block text-sm">Ciudad</label><select id="city" className="field" value={city} onChange={e => { setCity(e.target.value as keyof typeof cities); setLoading(true); setError(''); setWeather(undefined); }}>{Object.keys(cities).map(name => <option key={name}>{name}</option>)}</select><div aria-live="polite" className="mt-7">{loading ? <p>Cargando clima…</p> : error ? <p className="notice" role="alert">{error}</p> : weather && <><p className="text-6xl font-bold text-[#c7ed78]">{weather.current_weather.temperature}{weather.current_weather_units.temperature}</p><p className="muted mt-4">Viento: {weather.current_weather.windspeed} {weather.current_weather_units.windspeed}</p></>}</div><p className="muted mt-8 text-sm">Actualización en el navegador al cambiar de ciudad.</p></section>;
}
