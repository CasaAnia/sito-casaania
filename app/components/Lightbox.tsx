'use client'

/**
 * Visore foto a schermo intero. Si naviga toccando la metà sinistra (indietro)
 * o la metà destra (avanti) — non solo le freccine. La ✕ in alto a destra chiude.
 * `src(n)` costruisce il percorso della foto n (così ogni camera gestisce i suoi
 * nomi file, incluso il caso speciale di Lena dove la foto 1 è "foto1b.jpg").
 */
export default function Lightbox({
  photos,
  current,
  src,
  onClose,
  onChange,
}: {
  photos: number[]
  current: number | null
  src: (n: number) => string
  onClose: () => void
  onChange: (n: number) => void
}) {
  if (current === null) return null
  const idx = photos.indexOf(current)
  const goPrev = () => onChange(photos[idx > 0 ? idx - 1 : photos.length - 1])
  const goNext = () => onChange(photos[idx < photos.length - 1 ? idx + 1 : 0])

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center" onClick={onClose}>
      <img src={src(current)} alt="" className="max-w-full max-h-full object-contain pointer-events-none select-none" />

      {/* Metà sinistra: foto precedente */}
      <button type="button" aria-label="Foto precedente"
        className="absolute left-0 top-0 bottom-0 w-1/2 flex items-center justify-start px-3 text-white/70 hover:text-white transition-colors text-4xl font-bold"
        onClick={e => { e.stopPropagation(); goPrev() }}>‹</button>

      {/* Metà destra: foto successiva */}
      <button type="button" aria-label="Foto successiva"
        className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-end px-3 text-white/70 hover:text-white transition-colors text-4xl font-bold"
        onClick={e => { e.stopPropagation(); goNext() }}>›</button>

      {/* Chiudi (sopra le zone) */}
      <button type="button" aria-label="Chiudi"
        className="absolute top-4 right-4 z-10 text-white text-3xl font-bold"
        onClick={e => { e.stopPropagation(); onClose() }}>✕</button>
    </div>
  )
}
