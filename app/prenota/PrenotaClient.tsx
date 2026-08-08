'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Logo from '../components/Logo'
import { ROOMS, roomPricing } from '@/lib/rooms'

const PHONE = '3427004354'
const WA_LINK = `https://wa.me/39${PHONE}`

// Link WhatsApp con messaggio già scritto: l'ospite non deve inventarsi
// cosa dire davanti alla chat vuota.
function waLink(text: string) {
  return `${WA_LINK}?text=${encodeURIComponent(text)}`
}

type RoomOption = {
  id: string
  name: string
  totalPerNight: number
  priceLabel: string
}

function getRoomOptions(numGuests: number): RoomOption[] {
  return ROOMS.filter(r => r.maxGuests >= numGuests).map(r => {
    const p = roomPricing(r.id, numGuests)!
    return {
      id: r.id,
      name: r.name,
      totalPerNight: p.totalPerNight,
      priceLabel: p.extraBed
        ? `€${p.basePerNight} + €${p.extraPerNight} letto aggiuntivo`
        : `€${p.totalPerNight}`,
    }
  })
}

// Data locale, non UTC: coi metodi UTC tra mezzanotte e le 2 il minimo
// selezionabile sarebbe "ieri".
function toDateStr(d: Date) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}
function getTodayStr() {
  return toDateStr(new Date())
}
function getTomorrowStr() {
  const t = new Date()
  t.setDate(t.getDate() + 1)
  return toDateStr(t)
}

function countNights(checkIn: string, checkOut: string): number {
  const a = new Date(checkIn)
  const b = new Date(checkOut)
  const diff = Math.round((b.getTime() - a.getTime()) / 86400000)
  return diff > 0 ? diff : 0
}

type Segment = { roomId: string; roomName: string; checkIn: string; checkOut: string }
type Step = 'form' | 'done' | 'error'

const inputClass =
  'w-full min-w-0 border border-gray-200 rounded-xl px-3 py-2.5 text-base min-h-[44px] bg-white'

export default function PrenotaClient() {
  const searchParams = useSearchParams()
  const preselectedRoomId = searchParams.get('room') || ''

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    numGuests: '1',
    checkIn: getTodayStr(),
    checkOut: getTomorrowStr(),
    preferredRoomId: preselectedRoomId,
    website: '', // honeypot: resta vuoto per gli umani
  })
  const [step, setStep] = useState<Step>('form')
  const [solution, setSolution] = useState<Segment[]>([])
  const [multiRoom, setMultiRoom] = useState(false)
  const [duplicate, setDuplicate] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  // 'full' = davvero nessuna disponibilità (409); 'tech' = qualsiasi altro
  // problema. Prima ogni errore diventava "tutto esaurito": una bugia che
  // mandava i clienti su Booking.
  const [errorKind, setErrorKind] = useState<'full' | 'tech'>('tech')

  function set(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    try {
      const res = await fetch('/api/prenota', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, numGuests: Number(form.numGuests) }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrorMsg(data.error || 'Errore durante la prenotazione')
        setErrorKind(res.status === 409 ? 'full' : 'tech')
        setStep('error')
      } else {
        setSolution(data.solution)
        setMultiRoom(data.multiRoom)
        setDuplicate(Boolean(data.duplicate))
        setStep('done')
      }
    } catch {
      setErrorMsg('Errore di connessione. Riprova.')
      setErrorKind('tech')
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
  const selectedRoom = roomOptions.find(r => r.id === form.preferredRoomId)
  const nights = countNights(form.checkIn, form.checkOut)

  const requestSummary = `${form.numGuests} ${Number(form.numGuests) === 1 ? 'persona' : 'persone'}, dal ${formatDate(form.checkIn)} al ${formatDate(form.checkOut)}`

  return (
    <main className="min-h-screen text-[#3a3a35]" style={{ backgroundColor: '#f9f6f1' }}>
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 py-4 grid grid-cols-[auto_1fr_auto] items-center gap-2">
          <Link href="/" className="justify-self-start text-green-800 font-bold hover:text-green-600 transition-colors whitespace-nowrap py-2">← Indietro</Link>
          <Link href="/" className="justify-self-center">
            <Logo compactOnMobile />
          </Link>
          <a href={waLink('Ciao Ania! Vorrei chiedere la disponibilità per un soggiorno a Casa Ania.')} target="_blank" rel="noopener noreferrer"
            className="justify-self-end text-green-700 text-sm font-semibold whitespace-nowrap py-2">💬 WhatsApp</a>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">

        {step === 'form' && (
          <>
            <h1 className="font-display text-2xl font-semibold text-[#1f3d2f] mb-1">Prenota la tua camera</h1>
            <p className="text-[#6f6a5e] text-sm mb-6">Compila il modulo — ti rispondiamo in pochi minuti</p>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Honeypot anti-bot: invisibile e fuori dal tab order */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <label htmlFor="website">Non compilare questo campo</label>
                <input id="website" type="text" name="website" tabIndex={-1} autoComplete="off"
                  value={form.website} onChange={e => set('website', e.target.value)} />
              </div>

              {/* DATE */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <p className="font-semibold text-[#3a3a35] mb-3">Date del soggiorno</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="min-w-0">
                    <label htmlFor="check-in" className="text-xs text-[#6f6a5e] mb-1 block">Check-in</label>
                    <input id="check-in" type="date" value={form.checkIn} min={getTodayStr()}
                      onChange={e => {
                        set('checkIn', e.target.value)
                        if (e.target.value >= form.checkOut) {
                          const d = new Date(e.target.value)
                          d.setDate(d.getDate() + 1)
                          set('checkOut', toDateStr(d))
                        }
                      }}
                      className={inputClass} required />
                  </div>
                  <div className="min-w-0">
                    <label htmlFor="check-out" className="text-xs text-[#6f6a5e] mb-1 block">Check-out</label>
                    <input id="check-out" type="date" value={form.checkOut} min={form.checkIn}
                      onChange={e => set('checkOut', e.target.value)}
                      className={inputClass} required />
                  </div>
                </div>
              </div>

              {/* OSPITI */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <p className="font-semibold text-[#3a3a35] mb-3">Numero di persone</p>
                <div className="grid grid-cols-4 gap-2">
                  {['1', '2', '3', '4'].map(n => (
                    <button key={n} type="button"
                      onClick={() => { set('numGuests', n); set('preferredRoomId', '') }}
                      className={`py-3 min-h-[44px] rounded-xl text-sm font-semibold border-2 transition-colors ${form.numGuests === n ? 'bg-green-700 text-white border-green-700' : 'bg-white text-[#3a3a35] border-gray-200'}`}>
                      {n} pers.
                    </button>
                  ))}
                </div>
              </div>

              {/* CAMERA */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <p className="font-semibold text-[#3a3a35] mb-1">Camera preferita</p>
                <p className="text-xs text-[#6f6a5e] mb-3">Opzionale — faremo del nostro meglio</p>
                <div className="space-y-2">
                  <button type="button"
                    onClick={() => set('preferredRoomId', '')}
                    className={`w-full text-left px-4 py-3 min-h-[44px] rounded-xl border-2 text-sm transition-colors ${form.preferredRoomId === '' ? 'border-green-600 bg-green-50 font-semibold text-green-800' : 'border-gray-200 text-[#3a3a35]'}`}>
                    Nessuna preferenza
                  </button>
                  {roomOptions.map(room => (
                    <button key={room.id} type="button"
                      onClick={() => set('preferredRoomId', room.id)}
                      className={`w-full text-left px-4 py-3 min-h-[44px] rounded-xl border-2 text-sm transition-colors ${form.preferredRoomId === room.id ? 'border-green-600 bg-green-50 font-semibold text-green-800' : 'border-gray-200 text-[#3a3a35]'}`}>
                      <span className="font-medium">{room.name}</span>
                      <span className="text-[#6f6a5e] ml-2 text-xs">{room.priceLabel}/notte</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* DATI */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <p className="font-semibold text-[#3a3a35] mb-3">I tuoi dati</p>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="first-name" className="text-xs text-[#6f6a5e] mb-1 block">Nome</label>
                      <input id="first-name" type="text" value={form.firstName} onChange={e => set('firstName', e.target.value)}
                        placeholder="Mario" required autoComplete="given-name"
                        className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="last-name" className="text-xs text-[#6f6a5e] mb-1 block">Cognome</label>
                      <input id="last-name" type="text" value={form.lastName} onChange={e => set('lastName', e.target.value)}
                        placeholder="Rossi" required autoComplete="family-name"
                        className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="text-xs text-[#6f6a5e] mb-1 block">Numero di telefono</label>
                    <input id="phone" type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}
                      placeholder="333 123 4567" required autoComplete="tel" inputMode="tel"
                      pattern="[0-9+ \(\)\-]{8,20}" title="Inserisci un numero di telefono valido (almeno 8 cifre)"
                      className={inputClass} />
                  </div>
                </div>
              </div>

              {/* Totale del soggiorno: il conto lo fa il sito, non l'ospite */}
              {selectedRoom && nights > 0 && (
                <p className="text-center text-sm text-[#3a3a35]">
                  {nights} {nights === 1 ? 'notte' : 'notti'} × €{selectedRoom.totalPerNight} ={' '}
                  <strong className="text-[#1f3d2f]">€{nights * selectedRoom.totalPerNight}</strong>
                </p>
              )}

              <button type="submit" disabled={loading}
                className="w-full bg-green-700 hover:bg-green-800 transition-colors text-white font-bold py-4 rounded-2xl text-base disabled:opacity-60">
                {loading ? 'Verifica disponibilità...' : 'Invia richiesta di prenotazione'}
              </button>

              <p className="text-center text-xs text-[#6f6a5e]">
                Ti rispondiamo su WhatsApp o per telefono entro pochi minuti
              </p>
            </form>

            <p className="text-center text-sm text-[#6f6a5e] mt-8">
              Preferisci scriverci direttamente?{' '}
              <a href={waLink(`Ciao Ania! Vorrei chiedere la disponibilità per ${requestSummary}.`)}
                target="_blank" rel="noopener noreferrer"
                className="text-green-700 font-semibold underline inline-block py-2">
                Siamo su WhatsApp
              </a>
            </p>

            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mt-4 text-center">
              <p className="font-display font-semibold text-[#1f3d2f] mb-2">Ti serve un passaggio?</p>
              <p className="text-sm text-[#3a3a35] mb-3">
                Arrivi in aereo o in treno? Veniamo a prenderti. Con i nostri autisti di fiducia organizziamo il trasferimento da Malpensa, Linate, Orio al Serio, dalle stazioni di Milano Centrale e Rogoredo e dai terminal bus di San Donato e Lampugnano. Scrivici su WhatsApp con data, orario e punto di arrivo: ti diciamo subito il prezzo. Meglio qualche giorno prima, così ti garantiamo il posto.
              </p>
              <a href={waLink('Ciao Ania! Vorrei informazioni sulla navetta per Casa Ania.')} target="_blank" rel="noopener noreferrer"
                className="inline-block border-2 border-green-700 text-green-700 hover:bg-green-50 transition-colors font-bold px-6 py-2.5 rounded-full text-sm">
                💬 Chiedi della navetta
              </a>
            </div>
          </>
        )}

        {step === 'done' && (
          <div className="text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="font-display text-2xl font-semibold text-[#1f3d2f] mb-2">
              {duplicate ? 'Richiesta già ricevuta!' : 'Richiesta inviata!'}
            </h2>
            <p className="text-[#6f6a5e] text-sm mb-6">
              {duplicate
                ? 'Avevamo già ricevuto la tua richiesta per queste date: è in buone mani, non serve reinviarla.'
                : <>Ti contatteremo su WhatsApp al numero <strong>{form.phone}</strong> entro pochi minuti.</>}
            </p>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-left mb-6">
              <p className="font-semibold text-[#3a3a35] mb-3">Riepilogo</p>
              <p className="text-sm text-[#3a3a35] mb-1">👤 {form.firstName} {form.lastName} · {form.numGuests} {Number(form.numGuests) === 1 ? 'persona' : 'persone'}</p>
              <p className="text-sm text-[#3a3a35] mb-3">📅 Dal {formatDate(form.checkIn)} al {formatDate(form.checkOut)}</p>
              {multiRoom ? (
                <>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-3">
                    <p className="text-amber-800 text-sm font-semibold mb-1">⚠️ Soggiorno con cambio camera</p>
                    <p className="text-amber-700 text-xs">
                      Per le date richieste il soggiorno è diviso in più camere. Per chiarimenti chiama direttamente la proprietaria.
                    </p>
                  </div>
                  {solution.map((seg, i) => (
                    <div key={i} className="text-sm text-[#3a3a35] mb-1">
                      🛏 <strong>{seg.roomName}</strong>: {formatDate(seg.checkIn)} → {formatDate(seg.checkOut)}
                    </div>
                  ))}
                </>
              ) : (
                <p className="text-sm text-[#3a3a35]">🛏 <strong>{solution[0]?.roomName}</strong></p>
              )}
            </div>

            <a href={waLink(`Ciao Ania! Ho appena inviato una richiesta dal sito: ${form.firstName} ${form.lastName}, ${requestSummary}.`)}
              target="_blank" rel="noopener noreferrer"
              className="block w-full bg-green-700 hover:bg-green-800 transition-colors text-white font-bold py-4 rounded-2xl text-sm mb-3">
              💬 Scrivi su WhatsApp
            </a>
            <Link href="/" className="inline-block text-sm text-[#6f6a5e] underline py-2">Torna alla home</Link>
          </div>
        )}

        {step === 'error' && errorKind === 'full' && (
          <div className="text-center">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="font-display text-2xl font-semibold text-[#1f3d2f] mb-2">Nessuna disponibilità</h2>
            <p className="text-[#6f6a5e] text-sm mb-6">Tutte le camere sono esaurite per queste date.</p>
            <button onClick={() => setStep('form')}
              className="block w-full bg-green-700 hover:bg-green-800 transition-colors text-white font-bold py-4 rounded-2xl text-sm mb-3">
              ← Modifica le date
            </button>
            <a href={waLink(`Ciao Ania! Sul sito non c'è disponibilità per ${requestSummary}: c'è qualche possibilità?`)}
              target="_blank" rel="noopener noreferrer"
              className="inline-block text-sm text-green-700 font-semibold underline py-2">
              Scrivici comunque: a volte troviamo una soluzione
            </a>
          </div>
        )}

        {step === 'error' && errorKind === 'tech' && (
          <div className="text-center">
            <div className="text-6xl mb-4">😕</div>
            <h2 className="font-display text-2xl font-semibold text-[#1f3d2f] mb-2">Qualcosa non ha funzionato</h2>
            <p className="text-[#6f6a5e] text-sm mb-2">La tua richiesta non è stata inviata.</p>
            {errorMsg && <p className="text-[#3a3a35] text-sm mb-6">{errorMsg}</p>}
            <button onClick={() => setStep('form')}
              className="block w-full bg-green-700 hover:bg-green-800 transition-colors text-white font-bold py-4 rounded-2xl text-sm mb-3">
              ← Riprova
            </button>
            <a href={waLink(`Ciao Ania! Ho provato a prenotare dal sito ma c'è stato un problema tecnico. Vorrei ${requestSummary}.`)}
              target="_blank" rel="noopener noreferrer"
              className="inline-block text-sm text-green-700 font-semibold underline py-2">
              Oppure scrivici su WhatsApp: ti rispondiamo subito
            </a>
          </div>
        )}

      </div>
    </main>
  )
}
