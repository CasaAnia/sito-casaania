'use client'
import { usePathname } from 'next/navigation'
import Footer from './Footer'

export default function ConditionalFooter() {
  const pathname = usePathname()
  if (pathname === '/info') return null
  return <Footer />
}
