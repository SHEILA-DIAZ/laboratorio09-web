import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = { title: 'Plano · Cine y series | Lab 09', description: 'Galería de películas con SSR, búsqueda CSR y laboratorios de Next.js.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>
    <header className="border-b border-white/10"><nav aria-label="Navegación principal" className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-6 py-5">
      <Link href="/" className="text-2xl font-black tracking-tight">◉ plano<span className="text-[#c7ed78]">.</span></Link>
      <div className="flex flex-wrap gap-5 text-sm text-zinc-300"><Link href="/">Galería</Link><Link href="/#busqueda">Buscar</Link><Link href="/pokemon-csr">Pokémon CSR</Link><Link href="/pokemon-ssr">Pokémon SSR</Link><Link href="/weather">Clima</Link></div>
      <span className="tag">LAB 09 / NEXT.JS</span>
    </nav></header>
    <main className="mx-auto max-w-7xl px-6 py-10">{children}</main>
    <footer className="mx-auto mt-12 flex max-w-7xl flex-wrap justify-between gap-3 border-t border-white/10 px-6 py-7 text-xs text-zinc-400"><span>plano. · Un lugar para tu próxima historia.</span><span>Next.js · TypeScript · OMDb · CSR + SSR</span></footer>
  </body></html>;
}
