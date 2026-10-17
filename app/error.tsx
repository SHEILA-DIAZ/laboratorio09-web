'use client';
export default function ErrorPage({ reset }: { reset: () => void }) { return <div className="panel"><h1 className="text-2xl font-bold">No se pudo cargar la página</h1><p className="muted my-5">Revisa tu conexión y vuelve a intentarlo.</p><button className="action" onClick={reset}>Reintentar</button></div>; }
