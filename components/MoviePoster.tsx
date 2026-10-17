'use client';

import { useState } from 'react';

export default function MoviePoster({ src, title, className = '' }: { src: string; title: string; className?: string }) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  if (!src || src === 'N/A' || failedSrc === src) {
    return <div role="img" aria-label={`Póster no disponible para ${title}`} className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#303b32] to-[#191c20] p-5 text-center ${className}`}>
      <svg aria-hidden="true" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#c7ed78" strokeWidth="1.3"><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M7 3v18M17 3v18M3 8h4M3 16h4M17 8h4M17 16h4" /></svg>
      <span className="text-sm font-medium text-zinc-300">Póster no disponible</span>
      <span className="text-xs text-zinc-400">{title}</span>
    </div>;
  }
  return <img src={src} alt={`Póster de ${title}`} loading="lazy" className={className} onError={() => setFailedSrc(src)} />;
}
