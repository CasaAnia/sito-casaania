import Link from 'next/link'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#1f3d2f' }} className="py-10 px-4 text-center">
      <div style={{ height: '0.5px', backgroundColor: 'rgba(245,239,228,0.25)' }} className="max-w-xs mx-auto mb-6" />
      <Logo variant="dark" />
      <p style={{ color: '#c9d6cc' }} className="text-xs mt-4">
        Via Liguria 26 – Fizzonasco, Pieve Emanuele (MI) · 342 700 4354
      </p>
      <p style={{ color: '#c9d6cc' }} className="text-xs mt-2 space-x-3">
        <Link href="/privacy" className="underline hover:text-[#f5efe4] transition-colors">Privacy</Link>
        <span>·</span>
        <Link href="/cookie" className="underline hover:text-[#f5efe4] transition-colors">Cookie</Link>
      </p>
      <p style={{ color: '#a8bfae' }} className="text-xs mt-3">
        © {new Date().getFullYear()} Casa Ania Rozzano
      </p>
    </footer>
  )
}
