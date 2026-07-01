import { Suspense } from 'react'
import PrenotaClient from './PrenotaClient'

export default function Prenota() {
  return (
    <Suspense fallback={null}>
      <PrenotaClient />
    </Suspense>
  )
}
