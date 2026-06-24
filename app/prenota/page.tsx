'use client'

import { useState } from 'react'
import Link from 'next/link'

const PHONE = '3427004345'
const WA_LINK = `https://wa.me/39${PHONE}`

const LENA_ID = '19ae4611-c0a4-42ae-8530-210f9a948e9e'

type RoomOption = {
  id: string
  name: string
  basePrice: number
  priceLabel: string
  extraBed: boolean
  extraBedCount: number
}

function getRoomOptions(numGuests: number): RoomOption[] {
  const n = numGuests
  const rooms: RoomOption[] = []

  // Singola Amelia: max 2 persone
  if (n <= 2) {
    rooms.push({
      id: 'fed43a69-5e19-4cf9-b1b3-64affa46f9b1',
      name: 'Singola Amelia',
      basePrice: n === 2 ? 75 : 70,
      priceLabel: n === 2 ? '€70 + €5 letto aggiuntivo' : '€70',
      extraBed: n === 2,
      extraBedCount: n === 2 ? 1 : 0,
    })
  }

  // Matrimoniale Allegra: max 3 persone
  if (n <= 3) {
    const extra = n === 3
    rooms.push({
      id: 'bfe8414c-97de-4aae-96c0-c6b0225d1a05',
      name: 'Matrimoniale Allegra',
      basePrice: extra ? 90 : 80,
      priceLabel: extra ? '€80 + €10 letto aggiuntivo' : '€80',
      extraBed: extra,
      extraBedCount: extra ? 1 : 0,
    })
  }

  // Matrimoniale Ambra: max 3 persone
  if (n <= 3) {
    const extra = n === 3
    rooms.push({
      id: '6a8870ce-be2b-41d9-971e-5c833a85eb4a',
      name: 'Matrimoniale Ambra',
      basePrice: extra ? 90 : 80,
      priceLabel: extra ? '€80 + €10 letto aggiuntivo' : '€80',
      extraBed: extra,
      extraBedCount: extra ? 1 : 0,
    })
  }

  // Tripla Lena: tutte le persone
  const lenaExtra = n === 4
  rooms.push({
    id: LENA_ID,
    name: 'Tripla Lena',
    basePrice: n === 4 ? 100 : n === 3 ? 90 : 80,
    priceLabel: n === 4 ? '€90 + €10 letto aggiuntivo' : n === 3 ? '€90' : '€80',
    extraBed: lenaExtra,
    extraBedCount: lenaExtra ? 1 : 0,
  })

  return rooms
}

function getTodayStr() {
  const t = new Date()
  return t.toISOString().slice(0, 10)
}
function getTomorrowStr() {
  const t = new Date()
  t.setDate(t.getDate() + 1)
  return t.toISOString().slice(0, 10)
}

type Segment = { roomId: string; roomName: string; checkIn: string; checkOut: string }
type Step = 'form' | 'done' | 'error'

export default function Prenota() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    numGuests: '1',
    checkIn: getTodayStr(),
    checkOut: getTomorrowStr(),
    preferredRoomId: '',
  })
  const [step, setStep] = useState<Step>('form')
  const [solution, setSolution] = useState<Segment[]>([])
  const [multiRoom, setMultiRoom] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  function set(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    try {
      const roomOptions = getRoomOptions(Number(form.numGuests))
      const selectedRoom = roomOptions.find(r => r.id === form.preferredRoomId)
      const res = await fetch('/api/prenota', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          numGuests: Number(form.numGuests),
          pricePerNight: selectedRoom?.basePrice,
          extraBed: selectedRoom?.extraBed || false,
          extraBedCount: selectedRoom?.extraBedCount || 0,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrorMsg(data.error || 'Errore durante la prenotazione')
        setStep('error')
      } else {
        setSolution(data.solution)
        setMultiRoom(data.multiRoom)
        setStep('done')
      }
    } catch {
      setErrorMsg('Errore di connessione. Riprova.')
      setStep('error')
    } finally {
      setLoading(false)
    }
  }

  function formatDate(d: string) {
    const [y, m, day] = d.split('-')
    return `${day}/${m}/${y}`
  }

  const roomOptions = getRoomOptions(Number(form.numGuests))

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">

      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-green-800 font-bold">← Casa Ania Rozzano</Link>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="text-green-700 text-sm font-semibold">💬 WhatsApp</a>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">

        {step === 'form' && (
          <>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Prenota la tua camera</h1>
            <p className="text-gray-500 text-sm mb-6">Compila il modulo — ti confermiamo in pochi minuti</p>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* DATE */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <p className="font-semibold text-gray-700 mb-3">Date del soggiorno</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Check-in</label>
                    <input type="date" value={form.checkIn} min={getTodayStr()}
                      onChange={e => {
                        set('checkIn', e.target.value)
                        if (e.target.value >= form.checkOut) {
                          const d = new Date(e.target.value)
                          d.setDate(d.getDate() + 1)
                          set('checkOut', d.toISOString().slice(0, 10))
                        }
                      }}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm" required />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Check-out</label>
                    <input type="date" value={form.checkOut} min={form.checkIn}
                      onChange={e => set('checkOut', e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm" required />
                  </div>
                </div>
              </div>

              {/* OSPITI */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <p className="font-semibold text-gray-700 mb-3">Numero di persone</p>
                <div className="grid grid-cols-4 gap-2">
                  {['1', '2', '3', '4'].map(n => (
                    <button key={n} type="button"
                      onClick={() => { set('numGuests', n); set('preferredRoomId', '') }}
                      className={`py-3 rounded-xl text-sm font-semibold border-2 transition-colors ${form.numGuests === n ? 'bg-green-700 text-white border-green-700' : 'bg-white text-gray-700 border-gray-200'}`}>
                      {n} pers.
                    </button>
                  ))}
                </div>
              </div>

              {/* CAMERA */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <p className="font-semibold text-gray-700 mb-1">Camera preferita</p>
                <p className="text-xs text-gray-400 mb-3">Opzionale — faremo del nostro meglio</p>
                <div className="space-y-2">
                  <button type="button"
                    onClick={() => set('preferredRoomId', '')}
                    className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm transition-colors ${form.preferredRoomId === '' ? 'border-green-600 bg-green-50 font-semibold text-green-800' : 'border-gray-200 text-gray-700'}`}>
                    Nessuna preferenza
                  </button>
                  {roomOptions.map(room => (
                    <button key={room.id} type="button"
                      onClick={() => set('preferredRoomId', room.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm transition-colors ${form.preferredRoomId === room.id ? 'border-green-600 bg-green-50 font-semibold text-green-800' : 'border-gray-200 text-gray-700'}`}>
                      <span className="font-medium">{room.name}</span>
                      <span className="text-gray-400 ml-2 text-xs">{room.priceLabel}/notte</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* DATI */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <p className="font-semibold text-gray-700 mb-3">I tuoi dati</p>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Nome</label>
                      <input type="text" value={form.firstName} onChange={e => set('firstName', e.target.value)}
                        placeholder="Mario" required
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Cognome</label>
                      <input type="text" value={form.lastName} onChange={e => set('lastName', e.target.value)}
                        placeholder="Rossi" required
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Numero di telefono</label>
                    <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}
                      placeholder="333 123 4567" required
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm" />
                  </div>
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-green-700 text-white font-bold py-4 rounded-2xl text-base disabled:opacity-60">
                {loading ? 'Verifica disponibilità...' : 'Prenota'}
              </button>

              <p className="text-center text-xs text-gray-400">
                Riceverai conferma via WhatsApp entro pochi minuti
              </p>
            </form>
          </>
        )}

        {step === 'done' && (
          <div className="text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Richiesta inviata!</h2>
            <p className="text-gray-500 text-sm mb-6">
              Ti contatteremo su WhatsApp al numero <strong>{form.phone}</strong> entro pochi minuti.
            </p>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-left mb-6">
              <p className="font-semibold text-gray-700 mb-3">Riepilogo</p>
              <p className="text-sm text-gray-600 mb-1">👤 {form.firstName} {form.lastName} · {form.numGuests} {Number(form.numGuests) === 1 ? 'persona' : 'persone'}</p>
              <p className="text-sm text-gray-600 mb-3">📅 Dal {formatDate(form.checkIn)} al {formatDate(form.checkOut)}</p>
              {multiRoom ? (
                <>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-3">
                    <p className="text-amber-800 text-sm font-semibold mb-1">⚠️ Soggiorno con cambio camera</p>
                    <p className="text-amber-700 text-xs">
                      Per le date richieste il soggiorno è diviso in più camere. Per chiarimenti chiama direttamente la proprietaria.
                    </p>
                  </div>
                  {solution.map((seg, i) => (
                    <div key={i} className="text-sm text-gray-700 mb-1">
                      🛏 <strong>{seg.roomName}</strong>: {formatDate(seg.checkIn)} → {formatDate(seg.checkOut)}
                    </div>
                  ))}
                </>
              ) : (
                <p className="text-sm text-gray-700">🛏 <strong>{solution[0]?.roomName}</strong></p>
              )}
            </div>

            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="block w-full bg-green-700 text-white font-bold py-4 rounded-2xl text-sm mb-3">
              💬 Scrivi su WhatsApp
            </a>
            <Link href="/" className="block text-sm text-gray-500 underline">Torna alla home</Link>
          </div>
        )}

        {step === 'error' && (
          <div className="text-center">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Nessuna disponibilità</h2>
            <p className="text-gray-500 text-sm mb-6">Non ci sono camere libere per le date selezionate. Prova con date diverse.</p>
            <button onClick={() => setStep('form')}
              className="block w-full bg-green-700 text-white font-bold py-4 rounded-2xl text-sm">
              ← Modifica le date
            </button>
          </div>
        )}

      </div>
    </main>
  )
}
