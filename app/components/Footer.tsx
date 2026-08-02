import Link from 'next/link'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#2d6a4f' }} className="py-10 px-4 text-center">
      <div style={{ height: '0.5px', backgroundColor: 'rgba(245,239,228,0.25)' }} className="max-w-xs mx-auto mb-6" />
      <Logo variant="dark" />
      <p style={{ color: '#e0ddd0' }} className="text-xs mt-4">
        Via Liguria 26 – Fizzonasco, Pieve Emanuele (MI) · 342 700 4354
      </p>
      <p style={{ color: '#f5efe4' }} className="text-xs mt-4">
        <Link href="/dormire-vicino-humanitas" className="underline hover:opacity-80 transition-opacity">
          Guida: dormire vicino a Humanitas
        </Link>
      </p>
      <p style={{ color: '#c9d6cc' }} className="text-xs mt-3 space-x-3">
        <Link href="/privacy" className="underline hover:text-[#f5efe4] transition-colors">Privacy</Link>
        <span>·</span>
        <Link href="/cookie" className="underline hover:text-[#f5efe4] transition-colors">Cookie</Link>
      </p>
      <p style={{ color: '#e0ddd0' }} className="text-xs mt-3">
        © {new Date().getFullYear()} Casa Ania Rozzano
      </p>
    </footer>
  )
}
