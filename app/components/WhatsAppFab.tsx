'use client'

import { useEffect, useRef, useState } from 'react'
import { MessageCircle } from 'lucide-react'

/* Pulsante WhatsApp flottante (solo mobile).
   Durante lo scroll si ritira per non coprire prezzi e CTA delle camere,
   e riappare appena lo scroll si ferma. Il "battito" wa-pulse resta
   sull'anchor interno perché la sua animazione userebbe lo stesso
   transform del wrapper che gestisce la scomparsa. */
export default function WhatsAppFab({ href }: { href: string }) {
  const [nascosto, setNascosto] = useState(false)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    const onScroll = () => {
      setNascosto(true)
      if (timer.current) window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setNascosto(false), 350)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (timer.current) window.clearTimeout(timer.current)
    }
  }, [])

  return (
    <div
      className={`md:hidden fixed right-4 z-50 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        nascosto ? 'opacity-0 motion-safe:translate-y-3 motion-safe:scale-90 pointer-events-none' : 'opacity-100'
      }`}
      style={{ bottom: 'calc(18px + env(safe-area-inset-bottom))' }}
    >
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label="Scrivici su WhatsApp"
        className="bg-green-700 hover:bg-green-800 transition-colors text-white rounded-full w-[54px] h-[54px] flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.15)] wa-pulse">
        <MessageCircle size={25} strokeWidth={2} aria-hidden="true" />
      </a>
    </div>
  )
}
