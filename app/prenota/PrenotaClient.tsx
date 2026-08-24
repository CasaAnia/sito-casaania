'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Logo from '../components/Logo'
import Image from 'next/image'
import { MessageCircle } from 'lucide-react'
import { ROOMS, roomPricing } from '@/lib/rooms'

// Foto di copertina delle camere: nella proposta alternativa la camera si
// presenta con la sua foto, non solo col nome
const ROOM_FOTO: Record<string, string> = {
  'fed43a69-5e19-4cf9-b1b3-64affa46f9b1': '/camere/singola/foto1.jpg',
  'bfe8414c-97de-4aae-96c0-c6b0225d1a05': '/camere/allegra/foto1.jpg',
  '6a8870ce-be2b-41d9-971e-5c833a85eb4a': '/camere/ambra/foto1.jpg',
  '19ae4611-c0a4-42ae-8530-210f9a948e9e': '/camere/lena/foto1b.jpg',
}

// Riga descrittiva sotto il nome nella card dell'alternativa: letti e bagno,
// come nelle pagine delle camere
const ROOM_DETTAGLI: Record<string, string> = {
  'fed43a69-5e19-4cf9-b1b3-64affa46f9b1': 'Letto singolo · bagno in camera',
  'bfe8414c-97de-4aae-96c0-c6b0225d1a05': 'Letto matrimoniale · bagno in camera',
  '6a8870ce-be2b-41d9-971e-5c833a85eb4a': 'Letto matrimoniale · bagno in camera',
  '19ae4611-c0a4-42ae-8530-210f9a948e9e': 'Tre posti letto · bagno privato esterno',
}

const PHONE = '3427004354'
const WA_LINK = `https://wa.me/39${PHONE}`

// Link WhatsApp con messaggio già scritto: l'ospite non deve inventarsi
// cosa dire davanti alla chat vuota.
function waLink(text: string) {
  return `${WA_LINK}?text=${encodeURIComponent(text)}`
}

// Solo resa visiva: "3427004354" → "342 700 4354". Il numero resta quello
// digitato dall'ospite; se non è un cellulare a 10 cifre si mostra com'è.
function formatPhoneDisplay(phone: string) {
  const digits = phone.replace(/\D/g, '')
  const local = digits.length === 12 && digits.startsWith('39') ? digits.slice(2) : digits
  if (local.length !== 10) return phone
  const prefix = local === digits ? '' : '+39 '
  return `${prefix}${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6)}`
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
        ? `€${p.basePerNight} + €${p.extraPerNight} per letto aggiuntivo`
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
type Step = 'form' | 'secondStay' | 'confirm' | 'done' | 'error'

const inputClass =
  'w-full min-w-0 border border-gray-200 rounded-xl px-3 py-2.5 text-base min-h-[44px] bg-white'

export default function PrenotaClient() {
  const searchParams = useSearchParams()
  const preselectedRoomId = searchParams.get('room') || ''

  // Anteprime locali delle schermate (?demo=confirm | done): solo in
  // sviluppo, il build di produzione le elimina.
  const demoParam = process.env.NODE_ENV === 'development' ? searchParams.get('demo') : null
  const demoConfirm = demoParam === 'confirm'
  // Variante con una sola camera libera (Amelia chiesta, resta solo Allegra)
  const demoConfirmUno = demoParam === 'confirm1'
  const demoDone = demoParam === 'done'
  // Richiesta doppia con stesse date ("Richiesta ricevuta!")
  const demoDoppione = demoParam === 'doppione'
  // Richiesta doppia con date sovrapposte ma diverse
  const demoDoppione2 = demoParam === 'doppione2'
  // Richiesta doppia: stesse date ma camera diversa
  const demoDoppione3 = demoParam === 'doppione3'
  const demoShift = (days: number) => {
    const d = new Date()
    d.setDate(d.getDate() + days)
    return d.toISOString().slice(0, 10)
  }
  const demoEsaurito = demoParam === 'esaurito'
  const demoErrore = demoParam === 'errore'

  const [form, setForm] = useState({
    firstName: demoDone ? 'Mario' : '',
    lastName: demoDone ? 'Rossi' : '',
    phone: demoDone ? '333 123 4567' : '',
    notes: '',
    numGuests: '1',
    checkIn: getTodayStr(),
    checkOut: getTomorrowStr(),
    preferredRoomId: demoConfirm || demoDoppione2 || demoDoppione3 ? 'bfe8414c-97de-4aae-96c0-c6b0225d1a05' : demoConfirmUno ? 'fed43a69-5e19-4cf9-b1b3-64affa46f9b1' : preselectedRoomId,
    // Honeypot: resta vuoto per gli umani. Il nome del campo NON deve
    // somigliare a niente di autocompilabile (website/url/azienda...):
    // l'autofill di Chrome riempie anche i campi nascosti e trasformerebbe
    // ogni cliente in un "bot" (successo davvero al primo test di Ania).
    hp_check: '',
  })
  const [step, setStep] = useState<Step>(
    demoConfirm || demoConfirmUno ? 'confirm' : demoDone || demoDoppione || demoDoppione2 || demoDoppione3 ? 'done' : demoEsaurito || demoErrore ? 'error' : 'form'
  )
  const [solution, setSolution] = useState<Segment[]>(
    demoDone
      ? [{ roomId: 'fed43a69-5e19-4cf9-b1b3-64affa46f9b1', roomName: 'Singola Amelia', checkIn: getTodayStr(), checkOut: getTomorrowStr() }]
      : demoDoppione
        ? [{ roomId: 'bfe8414c-97de-4aae-96c0-c6b0225d1a05', roomName: 'Matrimoniale Allegra', checkIn: getTodayStr(), checkOut: getTomorrowStr() }]
        : demoDoppione2
          ? [{ roomId: 'fed43a69-5e19-4cf9-b1b3-64affa46f9b1', roomName: 'Singola Amelia', checkIn: getTodayStr(), checkOut: demoShift(2) }]
          : demoDoppione3
            ? [{ roomId: 'fed43a69-5e19-4cf9-b1b3-64affa46f9b1', roomName: 'Singola Amelia', checkIn: getTodayStr(), checkOut: getTomorrowStr() }]
            : []
  )
  const [multiRoom, setMultiRoom] = useState(false)
  const [duplicate, setDuplicate] = useState(demoDoppione || demoDoppione2 || demoDoppione3)
  // Sistemazione proposta dalla verifica, in attesa del "sì" dell'ospite
  const [proposal, setProposal] = useState<Segment[]>(
    demoConfirm
      ? [{ roomId: 'fed43a69-5e19-4cf9-b1b3-64affa46f9b1', roomName: 'Singola Amelia', checkIn: getTodayStr(), checkOut: getTomorrowStr() }]
      : demoConfirmUno
        ? [{ roomId: 'bfe8414c-97de-4aae-96c0-c6b0225d1a05', roomName: 'Matrimoniale Allegra', checkIn: getTodayStr(), checkOut: getTomorrowStr() }]
        : []
  )
  const [proposalMultiRoom, setProposalMultiRoom] = useState(false)
  // Tutte le camere libere per le date chieste: se sono più di una il
  // cliente le vede tutte e sceglie lui, non gliene proponiamo una d'ufficio
  const [proposalFreeRooms, setProposalFreeRooms] = useState<{ id: string; name: string }[]>(
    demoConfirm
      ? [
          { id: 'fed43a69-5e19-4cf9-b1b3-64affa46f9b1', name: 'Singola Amelia' },
          { id: '19ae4611-c0a4-42ae-8530-210f9a948e9e', name: 'Tripla Lena' },
        ]
      : demoConfirmUno
        ? [{ id: 'bfe8414c-97de-4aae-96c0-c6b0225d1a05', name: 'Matrimoniale Allegra' }]
        : []
  )
  const [confirmRoomId, setConfirmRoomId] = useState(
    demoConfirm ? 'fed43a69-5e19-4cf9-b1b3-64affa46f9b1' : demoConfirmUno ? 'bfe8414c-97de-4aae-96c0-c6b0225d1a05' : ''
  )
  // Richiesta recente in attesa con date diverse: prima di crearne una
  // seconda si chiede all'ospite se è un soggiorno in più o un cambio date
  const [recentPending, setRecentPending] = useState<Segment[]>([])
  const [allowSecondStay, setAllowSecondStay] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState(demoErrore ? 'Errore di connessione. Riprova.' : '')
  // 'full' = davvero nessuna disponibilità (409); 'tech' = qualsiasi altro
  // problema. Prima ogni errore diventava "tutto esaurito": una bugia che
  // mandava i clienti su Booking.
  const [errorKind, setErrorKind] = useState<'full' | 'tech'>(demoEsaurito ? 'full' : 'tech')

  function set(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  // Ogni cambio di schermata riparte dall'alto: senza questo si atterra a
  // metà pagina, dove si era rimasti col form.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [step])

  async function callApi(extra: Record<string, unknown>) {
    const res = await fetch('/api/prenota', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, numGuests: Number(form.numGuests), ...extra }),
    })
    const data = await res.json()
    return { res, data }
  }

  function showError(res: Response, data: { error?: string }) {
    setErrorMsg(data.error || 'Errore durante la prenotazione')
    setErrorKind(res.status === 409 ? 'full' : 'tech')
    setStep('error')
  }

  function showDone(data: { solution: Segment[]; multiRoom: boolean; duplicate?: boolean }) {
    setSolution(data.solution)
    setMultiRoom(data.multiRoom)
    setDuplicate(Boolean(data.duplicate))
    setStep('done')
  }

  // Fase 1: verifica senza salvare. Se la sistemazione proposta non è quella
  // scelta dall'ospite (o comporta un cambio camera), si chiede conferma
  // PRIMA di inviare: niente più camere assegnate a sorpresa nel riepilogo.
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setAllowSecondStay(false)
    await submitRequest(false)
  }

  async function submitRequest(secondStayOk: boolean) {
    setLoading(true)
    setErrorMsg('')
    try {
      const check = await callApi({ checkOnly: true, secondStayOk })
      if (!check.res.ok) { showError(check.res, check.data); return }
      if (check.data.duplicate) { showDone(check.data); return }
      if (check.data.needsIntent) {
        setRecentPending(check.data.recentPending)
        setStep('secondStay')
        return
      }

      const sol: Segment[] = check.data.solution
      const needsConfirm =
        check.data.multiRoom || (form.preferredRoomId !== '' && sol[0]?.roomId !== form.preferredRoomId)
      if (needsConfirm) {
        setProposal(sol)
        setProposalMultiRoom(check.data.multiRoom)
        setProposalFreeRooms(Array.isArray(check.data.freeRooms) ? check.data.freeRooms : [])
        setConfirmRoomId(sol[0]?.roomId || '')
        setStep('confirm')
        return
      }

      // Fase 2 diretta: la camera è quella chiesta (o nessuna preferenza)
      const book = await callApi({ secondStayOk })
      if (!book.res.ok) { showError(book.res, book.data) } else { showDone(book.data) }
    } catch {
      setErrorMsg('Errore di connessione. Riprova.')
      setErrorKind('tech')
      setStep('error')
    } finally {
      setLoading(false)
    }
  }

  // Fase 2 dopo il "sì" dell'ospite sulla camera scelta tra quelle libere
  async function handleConfirm() {
    setLoading(true)
    try {
      const book = await callApi({
        preferredRoomId: confirmRoomId || (proposal.length === 1 ? proposal[0].roomId : form.preferredRoomId),
        secondStayOk: allowSecondStay,
      })
      if (!book.res.ok) { showError(book.res, book.data) } else { showDone(book.data) }
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

  // "dal 13 al 16 agosto" (o "dal 30 agosto al 2 settembre"): le date vere
  // del cliente, scritte come le direbbe una persona
  function formatPeriodo(checkIn: string, checkOut: string) {
    const MESI = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre']
    const [y1, m1, d1] = checkIn.split('-').map(Number)
    const [y2, m2, d2] = checkOut.split('-').map(Number)
    const annoCorrente = new Date().getFullYear()
    const anno1 = y1 !== annoCorrente ? ` ${y1}` : ''
    const anno2 = y2 !== annoCorrente ? ` ${y2}` : ''
    if (m1 === m2 && y1 === y2) return `dal ${d1} al ${d2} ${MESI[m1 - 1]}${anno1}`
    return `dal ${d1} ${MESI[m1 - 1]}${anno1} al ${d2} ${MESI[m2 - 1]}${anno2}`
  }

  // "2026-08-21" → "21 ago": nel riepilogo l'anno è rumore
  function formatDateShort(d: string) {
    const months = ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic']
    const [, m, day] = d.split('-')
    return `${Number(day)} ${months[Number(m) - 1]}`
  }

  const roomOptions = getRoomOptions(Number(form.numGuests))
  const selectedRoom = roomOptions.find(r => r.id === form.preferredRoomId)
  const nights = countNights(form.checkIn, form.checkOut)

  // Doppione con date diverse: l'ospite non sta rimandando la stessa
  // richiesta, sta provando a cambiare il soggiorno. Il messaggio deve
  // dirlo chiaramente invece di un generico "già ricevuta".
  const dupCheckIn = solution.reduce((a, s) => (a === '' || s.checkIn < a ? s.checkIn : a), '')
  const dupCheckOut = solution.reduce((a, s) => (s.checkOut > a ? s.checkOut : a), '')
  const dupSameDates = dupCheckIn === form.checkIn && dupCheckOut === form.checkOut
  // Stessa camera già richiesta (o nessuna preferenza): insieme alle stesse
  // date è un semplice reinvio. Se invece l'ospite continua a chiedere
  // un'altra camera, va mostrata anche quella (voluto da Ania, ago 2026)
  const dupSameRoom = !selectedRoom || solution.some(seg => seg.roomId === selectedRoom.id)
  const dupIdentical = dupSameDates && dupSameRoom
  // Nel WhatsApp del doppione vanno SEMPRE tutte e due le richieste complete
  // (camera + date di ciascuna): con sovrapposizione parziale le date sono
  // diverse e "per queste date" sarebbe sbagliato (voluto da Ania, ago 2026)
  const dupPrevSummary = solution
    .map(seg => `la ${seg.roomName}, dal ${formatDate(seg.checkIn)} al ${formatDate(seg.checkOut)}`)
    .join(' e ')

  const requestSummary = `${form.numGuests} ${Number(form.numGuests) === 1 ? 'persona' : 'persone'}, dal ${formatDate(form.checkIn)} al ${formatDate(form.checkOut)}`

  return (
    <main className="min-h-screen text-[#3a3a35]" style={{ backgroundColor: '#f9f6f1' }}>
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 py-4 grid grid-cols-[auto_1fr_auto] items-center gap-2">
          <Link href="/" className="justify-self-start text-green-800 font-semibold hover:text-green-600 transition-colors whitespace-nowrap py-2">← Indietro</Link>
          <Link href="/" className="justify-self-center">
            <Logo compactOnMobile />
          </Link>
          <a href={waLink('Ciao Ania! Vorrei chiedere la disponibilità per un soggiorno a Casa Ania.')} target="_blank" rel="noopener noreferrer"
            className="justify-self-end text-green-700 text-sm font-semibold whitespace-nowrap py-2">WhatsApp</a>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 pt-4 pb-8">

        {step === 'form' && (
          <>
            <h1 className="text-2xl font-semibold text-[#1f3d2f] mb-1">Prenota la tua camera</h1>
            <p className="text-[#6f6a5e] text-base mb-6">Compila la richiesta: <strong className="text-[#1f3d2f]">Ania ti risponderà su WhatsApp o per telefono in pochi minuti.</strong></p>

            <form onSubmit={handleSubmit} className="space-y-3">

              {/* Honeypot anti-bot: invisibile e fuori dal tab order */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <label htmlFor="hp-check">Lascia vuoto</label>
                <input id="hp-check" type="text" name="hp_check" tabIndex={-1} autoComplete="off"
                  value={form.hp_check} onChange={e => set('hp_check', e.target.value)} />
              </div>

              {/* DATE */}
              <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100">
                <p className="font-semibold text-[#1f3d2f] mb-2">Date del soggiorno</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="min-w-0">
                    <label htmlFor="check-in" className="text-sm text-[#6f6a5e] mb-1 block">Check-in</label>
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
                    <label htmlFor="check-out" className="text-sm text-[#6f6a5e] mb-1 block">Check-out</label>
                    <input id="check-out" type="date" value={form.checkOut} min={form.checkIn}
                      onChange={e => set('checkOut', e.target.value)}
                      className={inputClass} required />
                  </div>
                </div>
              </div>

              {/* OSPITI */}
              <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100">
                <p className="font-semibold text-[#1f3d2f] mb-2">Numero di persone</p>
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
              <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100">
                <p className="font-semibold text-[#1f3d2f] mb-2">Camera preferita</p>
                <div className="space-y-1.5">
                  <button type="button"
                    onClick={() => set('preferredRoomId', '')}
                    className={`w-full text-left px-4 py-2.5 min-h-[44px] rounded-xl border-2 text-sm transition-colors ${form.preferredRoomId === '' ? 'border-green-600 bg-green-50 font-semibold text-green-800' : 'border-gray-200 text-[#3a3a35]'}`}>
                    Nessuna preferenza
                  </button>
                  {roomOptions.map(room => (
                    <button key={room.id} type="button"
                      onClick={() => set('preferredRoomId', room.id)}
                      className={`w-full text-left px-4 py-2.5 min-h-[44px] rounded-xl border-2 text-sm transition-colors ${form.preferredRoomId === room.id ? 'border-green-600 bg-green-50 font-semibold text-green-800' : 'border-gray-200 text-[#3a3a35]'}`}>
                      <span className="font-semibold text-[#1f3d2f]">{room.name}</span>
                      <span className="text-[#6f6a5e] ml-2">{room.priceLabel} / notte</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* DATI */}
              <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100">
                <p className="font-semibold text-[#1f3d2f] mb-2">I tuoi dati</p>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="first-name" className="text-sm text-[#6f6a5e] mb-1 block">Nome</label>
                      <input id="first-name" type="text" value={form.firstName} onChange={e => set('firstName', e.target.value)}
                        placeholder="Mario" required autoComplete="given-name"
                        className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="last-name" className="text-sm text-[#6f6a5e] mb-1 block">Cognome</label>
                      <input id="last-name" type="text" value={form.lastName} onChange={e => set('lastName', e.target.value)}
                        placeholder="Rossi" required autoComplete="family-name"
                        className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="text-sm text-[#6f6a5e] mb-1 block">Numero di telefono</label>
                    <input id="phone" type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}
                      placeholder="333 123 4567" required autoComplete="tel" inputMode="tel"
                      pattern="[0-9+ \(\)\-]{8,20}" title="Inserisci un numero di telefono valido (almeno 8 cifre)"
                      className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="notes" className="text-sm text-[#6f6a5e] mb-1 block">Note per Ania (facoltative)</label>
                    <textarea id="notes" value={form.notes} onChange={e => set('notes', e.target.value)}
                      placeholder="Scrivi qui se c'è qualcosa che Ania deve sapere: ad esempio se sei già stato da noi o chi ti ha consigliato Casa Ania"
                      rows={3} maxLength={500}
                      className={inputClass + ' resize-none'} />
                  </div>
                </div>
              </div>

              {/* Totale del soggiorno: il conto lo fa il sito, non l'ospite */}
              {selectedRoom && nights > 0 && (
                <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100">
                  <p className="font-semibold text-[#1f3d2f] mb-2">Il tuo soggiorno</p>
                  <div className="flex justify-between text-sm text-[#6f6a5e] mb-1.5">
                    <span>{selectedRoom.name}</span>
                    <span>€{selectedRoom.totalPerNight} / notte</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#6f6a5e] mb-3">
                    <span>{nights} {nights === 1 ? 'notte' : 'notti'} · {formatDateShort(form.checkIn)} → {formatDateShort(form.checkOut)}</span>
                    <span>{nights} × €{selectedRoom.totalPerNight}</span>
                  </div>
                  <div className="flex justify-between items-baseline border-t border-gray-100 pt-3">
                    <span className="text-sm font-semibold text-[#1f3d2f]">Totale</span>
                    <span className="text-2xl font-semibold text-[#1f3d2f]">€{nights * selectedRoom.totalPerNight}</span>
                  </div>
                </div>
              )}

              <button type="submit" disabled={loading}
                className="w-full !mt-6 bg-green-700 hover:bg-green-800 transition-colors text-white font-semibold py-4 rounded-2xl text-base disabled:opacity-60">
                {loading ? 'Verifica disponibilità...' : 'Invia la richiesta di prenotazione'}
              </button>

              <p className="text-center text-base !mt-4 text-[#6f6a5e]">
                Ti risponderemo <strong className="text-[#1f3d2f]">su WhatsApp o per telefono entro pochi minuti</strong> per confermare la disponibilità.
              </p>
            </form>

            <div className="text-center mt-8">
              <p className="text-base text-[#6f6a5e] mb-2">Preferisci scriverci direttamente?</p>
              <a href={waLink(`Ciao Ania! Vorrei chiedere la disponibilità per ${requestSummary}.`)}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border-2 border-green-700 text-green-700 hover:bg-green-50 transition-colors font-semibold px-6 py-2.5 rounded-full text-sm">
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.9-1.4A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20Zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8.9-.3.2-.5 0a6.5 6.5 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.4c.1-.2.2-.3.3-.5s0-.4 0-.5-.5-1.3-.7-1.8-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.1 11.1 0 0 0 4.3 3.8 14.5 14.5 0 0 0 1.4.5 3.4 3.4 0 0 0 1.6.1 2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3Z"/></svg>
                Scrivici su WhatsApp
              </a>
            </div>

            <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100 mt-8 text-center">
              <p className="font-semibold text-[#1f3d2f] mb-2">Ti serve un passaggio?</p>
              <p className="text-sm text-[#3a3a35] mb-1.5">
                Arrivi in aereo o in treno? <strong className="text-[#1f3d2f]">Pensiamo noi al tuo trasferimento.</strong>
              </p>
              <p className="text-sm text-[#3a3a35] mb-1.5">
                Organizziamo il servizio con <strong className="text-[#1f3d2f]">autisti di fiducia</strong> da Malpensa, Linate e Orio al Serio, dalle stazioni di Milano Centrale e Rogoredo e dai terminal bus di San Donato e Lampugnano.
              </p>
              <p className="text-sm text-[#3a3a35] mb-1.5">
                Scrivici su WhatsApp indicando <strong className="text-[#1f3d2f]">data, orario e punto di arrivo</strong>: ti comunicheremo subito il prezzo.
              </p>
              <p className="text-sm text-[#3a3a35] mb-2">
                <strong className="text-[#1f3d2f]">Ti consigliamo di prenotare il trasferimento con qualche giorno di anticipo</strong>, così possiamo garantirti la disponibilità.
              </p>
              <a href={waLink('💬 Ciao Ania! Vorrei informazioni sul trasferimento per Casa Ania.')} target="_blank" rel="noopener noreferrer"
                className="inline-block mt-1 border-2 border-green-700 text-green-700 hover:bg-green-50 transition-colors font-semibold px-6 py-2.5 rounded-full text-sm">
                Chiedi informazioni sul trasferimento
              </a>
            </div>
          </>
        )}

        {step === 'secondStay' && (() => {
          const recentIn = recentPending.reduce((a, s) => (a === '' || s.checkIn < a ? s.checkIn : a), '')
          const recentOut = recentPending.reduce((a, s) => (s.checkOut > a ? s.checkOut : a), '')
          return (
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-[#1f3d2f] mt-4 mb-6 text-balance">Abbiamo già una tua richiesta</h2>
            <p className="text-[#3a3a35] text-base mb-6">
              Abbiamo già una tua richiesta per il <strong>{formatDateShort(recentIn)} → {formatDateShort(recentOut)}</strong>. Vuoi <strong>aggiungere un altro soggiorno</strong>, o <strong>sostituire le date</strong> di quella di prima?
            </p>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-left mb-6">
              <p className="font-semibold text-[#1f3d2f] mb-3">La richiesta precedente</p>
              {recentPending.map((seg, i) => (
                <p key={i} className="text-sm text-[#3a3a35] mb-1">
                  <strong>{seg.roomName}</strong>: {formatDate(seg.checkIn)} → {formatDate(seg.checkOut)}
                </p>
              ))}
              <div className="border-t border-gray-100 mt-3 pt-3">
                <p className="font-semibold text-[#1f3d2f] mb-1">La nuova richiesta</p>
                <p className="text-sm text-[#1f3d2f]">
                  <strong>{selectedRoom ? selectedRoom.name : 'Nessuna preferenza'}</strong>: {' '}
                  <strong>{formatDate(form.checkIn)} → {formatDate(form.checkOut)}</strong>
                </p>
              </div>
            </div>
            <button onClick={() => { setAllowSecondStay(true); submitRequest(true) }} disabled={loading}
              className="block w-full bg-green-700 hover:bg-green-800 transition-colors text-white font-semibold py-4 rounded-2xl text-sm mb-3 disabled:opacity-60">
              {loading ? 'Invio...' : 'Aggiungi un altro soggiorno'}
            </button>
            <button onClick={() => { setSolution(recentPending); setDuplicate(true); setStep('done') }} disabled={loading}
              className="block w-full border-2 border-gray-300 text-[#3a3a35] font-semibold py-3.5 rounded-2xl text-sm bg-white">
              Sostituisci le date di quella di prima
            </button>
          </div>
          )
        })()}

        {step === 'confirm' && (() => {
          // "Matrimoniale Allegra" → "Allegra": nella conversazione si dice
          // "la camera Allegra", il tipo è già noto dal form
          const shortName = (n?: string) => (n || '').split(' ').pop()
          const preferred = shortName(ROOMS.find(r => r.id === form.preferredRoomId)?.name)
          const p = proposal.length === 1 ? roomPricing(proposal[0].roomId, Number(form.numGuests)) : null

          // Una sola camera alternativa: schermata "alternativa disponibile"
          // col design approvato — annuncio, card con foto e conto, azioni
          if (!proposalMultiRoom && proposalFreeRooms.length <= 1 && preferred) {
            const alt = proposal[0]
            const altShort = shortName(alt?.roomName)
            const totale = p ? p.totalPerNight * nights : 0
            return (
              <div>
                <section className="text-center" aria-labelledby="titolo-alternativa">
                  <span className="inline-block bg-[#eaf2ed] text-[#2d6a4f] font-extrabold text-[0.72rem] tracking-[0.12em] uppercase px-3.5 py-[7px] rounded-full">
                    Disponibilità verificata
                  </span>
                  <h2 id="titolo-alternativa" className="font-semibold text-[#1f3d2f] text-[clamp(2.05rem,6vw,2.5rem)] leading-[1.15] mt-[18px] mb-3.5">
                    Abbiamo trovato un&rsquo;alternativa per&nbsp;te
                  </h2>
                  <p className="text-[#4a5248] text-base leading-[1.65] max-w-[34rem] mx-auto">
                    {/* {' '} esplicito: questo compilatore scarta lo spazio
                        dopo un tag inline a fine parola */}
                    La camera <strong className="text-[#1f3d2f]">{preferred}</strong>{' '}non è più disponibile per le tue date,
                    ma c&rsquo;è una buona notizia: abbiamo ancora una soluzione pronta ad accoglierti.
                  </p>
                </section>

                <article className="bg-white rounded-[22px] overflow-hidden shadow-[0_14px_40px_rgba(31,61,47,0.10)] mt-7 mb-[26px] text-left" aria-labelledby="nome-camera">
                  <div className="flex items-center gap-3.5 p-4 sm:gap-[18px] sm:p-5">
                    {ROOM_FOTO[alt?.roomId || ''] && (
                      <Image src={ROOM_FOTO[alt.roomId]} alt={`Camera ${alt.roomName}`} width={130} height={130}
                        className="w-[104px] h-[104px] sm:w-[130px] sm:h-[130px] object-cover rounded-[14px] flex-none" />
                    )}
                    <div>
                      <p className="font-extrabold text-[0.68rem] tracking-[0.11em] uppercase text-[#2d6a4f]">Disponibile</p>
                      <h3 id="nome-camera" className="font-semibold text-[1.3rem] sm:text-[1.45rem] text-[#1f3d2f] mt-1 mb-0.5">{alt?.roomName}</h3>
                      {ROOM_DETTAGLI[alt?.roomId || ''] && (
                        <p className="text-[0.92rem] text-[#4a5248]">{ROOM_DETTAGLI[alt.roomId]}</p>
                      )}
                    </div>
                  </div>
                  {p && nights > 0 && (
                    <div className="border-t border-dashed border-[#e9e4d8] px-5 py-[18px]">
                      <p className="font-extrabold text-[0.68rem] tracking-[0.11em] uppercase text-[#8a8f86] mb-3">Il tuo soggiorno</p>
                      <p className="flex justify-between text-[0.97rem] text-[#4a5248] mb-2">
                        <span>€{p.totalPerNight} × {nights} {nights === 1 ? 'notte' : 'notti'}</span>
                        <span>€{totale}</span>
                      </p>
                      <p className="flex justify-between items-baseline border-t border-[#e9e4d8] pt-3 mt-1">
                        <strong className="text-[#1f3d2f]">Totale</strong>
                        <strong className="text-[1.25rem] text-[#1f3d2f]">€{totale}</strong>
                      </p>
                    </div>
                  )}
                </article>

                <p className="text-center text-[#4a5248] text-base leading-[1.6] mb-[22px]">
                  Ti piace questa soluzione? Invia la richiesta per bloccare la
                  disponibilità, oppure modifica le date per verificare anche le altre camere.
                </p>

                <div className="sm:max-w-[480px] sm:mx-auto">
                  <button onClick={handleConfirm} disabled={loading}
                    className="block w-full text-center rounded-full py-[17px] px-6 bg-[#2d6a4f] hover:bg-[#275e46] transition-colors text-white font-semibold text-[1.05rem] shadow-[0_10px_24px_rgba(45,106,79,0.28)] disabled:opacity-60">
                    {loading ? 'Invio...' : `Invia la richiesta per la camera ${altShort}`}
                  </button>
                  <button onClick={() => setStep('form')} disabled={loading}
                    className="block w-full text-center rounded-full py-[17px] px-6 bg-white hover:bg-[#fbf9f4] transition-colors text-[#1f3d2f] font-semibold text-[1.05rem] border-[1.5px] border-[#e9e4d8] shadow-[0_2px_8px_rgba(31,61,47,0.05)] mt-3">
                    ← Cambia le date del soggiorno
                  </button>
                  <p className="text-center text-[0.85rem] text-[#8a8f86] mt-[18px]">
                    La richiesta non è vincolante: ti confermiamo noi su WhatsApp.
                  </p>
                </div>
              </div>
            )
          }

          // Più camere libere: stesse card del design "alternativa
          // disponibile", ma selezionabili — il conto segue la scelta
          if (!proposalMultiRoom && proposalFreeRooms.length > 1) {
            const chosenId = confirmRoomId || proposal[0]?.roomId || proposalFreeRooms[0].id
            const chosen = proposalFreeRooms.find(r => r.id === chosenId)
            const cp = roomPricing(chosenId, Number(form.numGuests))
            const chosenShort = shortName(chosen?.name)
            const QUANTE = ['due', 'tre', 'quattro']
            const quante = QUANTE[proposalFreeRooms.length - 2] || String(proposalFreeRooms.length)
            return (
              <div>
                <section className="text-center" aria-labelledby="titolo-alternative">
                  <span className="inline-block bg-[#eaf2ed] text-[#2d6a4f] font-extrabold text-[0.72rem] tracking-[0.12em] uppercase px-3.5 py-[7px] rounded-full">
                    Disponibilità verificata
                  </span>
                  <h2 id="titolo-alternative" className="font-semibold text-[#1f3d2f] text-[clamp(2.05rem,6vw,2.5rem)] leading-[1.15] mt-[18px] mb-3.5">
                    Abbiamo trovato {quante}{' '}alternative per&nbsp;te
                  </h2>
                  <p className="text-[#4a5248] text-base leading-[1.65] max-w-[34rem] mx-auto">
                    {preferred
                      ? <>La camera <strong className="text-[#1f3d2f]">{preferred}</strong>{' '}non è più disponibile per le tue date,
                          ma c&rsquo;è una buona notizia: queste camere sono libere. Scegli quella che preferisci.</>
                      : <>Per le tue date queste camere sono libere. Scegli quella che preferisci.</>}
                  </p>
                </section>

                <div className="mt-7 mb-[26px] space-y-3" role="radiogroup" aria-label="Camere disponibili">
                  {proposalFreeRooms.map(room => {
                    const rp = roomPricing(room.id, Number(form.numGuests))
                    if (!rp) return null
                    const selected = room.id === chosenId
                    return (
                      <button key={room.id} type="button" role="radio" aria-checked={selected}
                        onClick={() => setConfirmRoomId(room.id)}
                        className={`w-full flex items-center gap-3.5 p-4 text-left rounded-[22px] bg-white border-2 transition-[border-color,transform] duration-200 active:scale-[0.98] ${selected ? 'border-[#2d6a4f] shadow-[0_14px_40px_rgba(31,61,47,0.10)]' : 'border-transparent shadow-[0_2px_10px_rgba(31,61,47,0.06)]'}`}>
                        {ROOM_FOTO[room.id] && (
                          <Image src={ROOM_FOTO[room.id]} alt={`Camera ${room.name}`} width={88} height={88}
                            className="w-[88px] h-[88px] sm:w-[104px] sm:h-[104px] object-cover rounded-[14px] flex-none" />
                        )}
                        <span className="block min-w-0 flex-1">
                          <span className="block font-semibold text-[1.15rem] sm:text-[1.3rem] text-[#1f3d2f]">{room.name}</span>
                          {ROOM_DETTAGLI[room.id] && (
                            <span className="block text-[0.85rem] text-[#4a5248] mt-0.5">{ROOM_DETTAGLI[room.id]}</span>
                          )}
                          <span className="block text-[0.97rem] text-[#1f3d2f] font-semibold mt-1">€{rp.totalPerNight} <span className="font-normal text-[#8a8f86]">a notte</span></span>
                        </span>
                        <span aria-hidden="true"
                          className={`flex-none w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200 ${selected ? 'bg-[#2d6a4f]' : 'border-[1.5px] border-[#e9e4d8]'}`}>
                          {selected && (
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                          )}
                        </span>
                      </button>
                    )
                  })}
                </div>

                {cp && nights > 0 && (
                  <div className="bg-white rounded-[22px] shadow-[0_14px_40px_rgba(31,61,47,0.10)] px-5 py-[18px] mb-[26px] text-left">
                    <p className="font-extrabold text-[0.68rem] tracking-[0.11em] uppercase text-[#8a8f86] mb-3">Il tuo soggiorno</p>
                    <p className="flex justify-between text-[0.97rem] text-[#4a5248] mb-2">
                      <span>Camera {chosenShort}</span>
                      <span>€{cp.totalPerNight} / notte</span>
                    </p>
                    <p className="flex justify-between text-[0.97rem] text-[#4a5248] mb-2">
                      <span>€{cp.totalPerNight} × {nights} {nights === 1 ? 'notte' : 'notti'}</span>
                      <span>€{cp.totalPerNight * nights}</span>
                    </p>
                    <p className="flex justify-between items-baseline border-t border-[#e9e4d8] pt-3 mt-1">
                      <strong className="text-[#1f3d2f]">Totale</strong>
                      <strong className="text-[1.25rem] text-[#1f3d2f]">€{cp.totalPerNight * nights}</strong>
                    </p>
                  </div>
                )}

                <p className="text-center text-[#4a5248] text-base leading-[1.6] mb-[22px]">
                  Hai scelto? Invia la richiesta per bloccare la disponibilità,
                  oppure modifica le date del soggiorno.
                </p>

                <div className="sm:max-w-[480px] sm:mx-auto">
                  <button onClick={handleConfirm} disabled={loading}
                    className="block w-full text-center rounded-full py-[17px] px-6 bg-[#2d6a4f] hover:bg-[#275e46] transition-[background-color,transform] duration-200 active:scale-[0.98] text-white font-semibold text-[1.05rem] shadow-[0_10px_24px_rgba(45,106,79,0.28)] disabled:opacity-60">
                    {loading ? 'Invio...' : `Invia la richiesta per la camera ${chosenShort}`}
                  </button>
                  <button onClick={() => setStep('form')} disabled={loading}
                    className="block w-full text-center rounded-full py-[17px] px-6 bg-white hover:bg-[#fbf9f4] transition-[background-color,transform] duration-200 active:scale-[0.98] text-[#1f3d2f] font-semibold text-[1.05rem] border-[1.5px] border-[#e9e4d8] shadow-[0_2px_8px_rgba(31,61,47,0.05)] mt-3">
                    ← Cambia le date del soggiorno
                  </button>
                  <p className="text-center text-[0.85rem] text-[#8a8f86] mt-[18px]">
                    La richiesta non è vincolante: ti confermiamo noi su WhatsApp.
                  </p>
                </div>
              </div>
            )
          }

          // Cambio camera a metà soggiorno
          return (
            <div className="text-center">
              <h2 className="text-3xl font-semibold text-[#1f3d2f] mt-4 mb-6 text-balance">
                {preferred ? 'La camera che hai scelto non è disponibile' : 'Abbiamo controllato la disponibilità'}
              </h2>
              <p className="text-[#3a3a35] text-base mb-4">
                {preferred ? <>Per le date che hai scelto la camera <strong>{preferred}</strong> non è più disponibile per l&apos;intero soggiorno.</> : <>Per le date che hai scelto nessuna camera è libera per l&apos;intero soggiorno.</>}{' '}
                Possiamo ospitarti con un <strong>cambio camera</strong>:
              </p>
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-left mb-4">
                {proposal.map((seg, i) => (
                  <p key={i} className="text-sm text-[#3a3a35] mb-1">
                    <strong>{seg.roomName}</strong>: {formatDate(seg.checkIn)} → {formatDate(seg.checkOut)}
                  </p>
                ))}
              </div>
              <p className="text-[#6f6a5e] text-xs mb-6">Al cambio pensiamo noi: ti aiutiamo a spostare le tue cose.</p>
              <p className="text-[#3a3a35] text-base font-semibold mb-4">
                Vuoi procedere con questa soluzione o preferisci modificare le date del soggiorno?
              </p>
              <button onClick={handleConfirm} disabled={loading}
                className="block w-full bg-green-700 hover:bg-green-800 transition-colors text-white font-semibold py-4 rounded-2xl text-base disabled:opacity-60 mb-3">
                {loading ? 'Invio...' : 'Invia la richiesta'}
              </button>
              <button onClick={() => setStep('form')} disabled={loading}
                className="block w-full border-2 border-gray-300 text-[#3a3a35] font-semibold py-3.5 rounded-2xl text-sm bg-white">
                ← Cambia le date del soggiorno
              </button>
            </div>
          )
        })()}

        {step === 'done' && (
          <div className="text-center">
            {duplicate ? (
              <>
                <h2 className="text-3xl font-semibold text-[#1f3d2f] mt-4 mb-6 text-balance">
                  Richiesta ricevuta!
                </h2>
                <p className="text-[#3a3a35] text-base mb-6">
                  È già arrivata sul telefono di Ania. <strong className="text-black">A breve ti risponderà direttamente su WhatsApp</strong> per confermare la richiesta.
                </p>
              </>
            ) : (
              <>
                {/* Spunta disegnata nei colori Casa Ania, come le icone della
                    home: mai emoji (cambiano aspetto da telefono a telefono) */}
                <div className="mx-auto mt-2 mb-5 w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: '#e7f0ea' }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2d6a4f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <h2 className="text-3xl font-semibold text-[#1f3d2f] mb-3 text-balance">Richiesta inviata!</h2>
                <p className="text-[#3a3a35] text-base mb-6">
                  Ania ti contatterà su WhatsApp al numero <strong>{formatPhoneDisplay(form.phone)}</strong> entro pochi minuti.
                </p>
              </>
            )}

            {duplicate ? (
              /* Stesse date: si mostra solo la richiesta in lavorazione.
                 Date sovrapposte ma diverse: prima la richiesta appena
                 digitata, sotto quella precedente, così l'ospite ha subito
                 il quadro di tutte e due (voluto da Ania, ago 2026) */
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-left mb-6">
                {!dupIdentical && (
                  <>
                    <p className="font-semibold text-[#3a3a35] mb-3">La tua nuova richiesta</p>
                    <p className="text-sm text-[#3a3a35] mb-1">
                      <strong>{selectedRoom ? selectedRoom.name : 'Nessuna preferenza'}</strong><br />
                      {formatDate(form.checkIn)} → {formatDate(form.checkOut)}
                    </p>
                    <div className="border-t border-gray-100 mt-3 pt-3" />
                  </>
                )}
                <p className="font-semibold text-[#3a3a35] mb-3">{dupIdentical ? 'In lavorazione' : 'La richiesta precedente'}</p>
                {solution.map((seg, i) => (
                  <p key={i} className="text-sm text-[#3a3a35] mb-1">
                    <strong>{seg.roomName}</strong><br />
                    {formatDate(seg.checkIn)} → {formatDate(seg.checkOut)}
                  </p>
                ))}
              </div>
            ) : (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-left mb-6">
              <p className="font-semibold text-[#1f3d2f] mb-3">Riepilogo</p>
              <p className="text-sm text-[#3a3a35] mb-1">{form.firstName} {form.lastName} · {form.numGuests} {Number(form.numGuests) === 1 ? 'persona' : 'persone'}</p>
              <p className="text-sm text-[#3a3a35] mb-3">Dal {formatDate(form.checkIn)} al {formatDate(form.checkOut)}</p>
              {multiRoom ? (
                <>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-3">
                    <p className="text-amber-800 text-sm font-semibold mb-1">Soggiorno con cambio camera</p>
                    <p className="text-amber-700 text-xs">
                      Per le date richieste il soggiorno è diviso in più camere. Per chiarimenti chiama direttamente la proprietaria.
                    </p>
                  </div>
                  {solution.map((seg, i) => (
                    <div key={i} className="text-sm text-[#3a3a35] mb-1">
                      <strong>{seg.roomName}</strong>: {formatDate(seg.checkIn)} → {formatDate(seg.checkOut)}
                    </div>
                  ))}
                </>
              ) : (
                <p className="text-sm text-[#3a3a35]"><strong>{solution[0]?.roomName}</strong></p>
              )}
            </div>
            )}

            {duplicate && (
              <p className="text-sm text-[#3a3a35] mb-4">
                <strong className="text-black">Hai già inviato una richiesta con date che coincidono o si sovrappongono a queste.</strong><br />
                Se vuoi cambiare camera, modificare le date oppure chiarire quale richiesta tenere, <strong className="text-black">scrivi ad Ania su WhatsApp</strong> usando il pulsante qui sotto. Ti aiuterà a sistemare tutto.
              </p>
            )}
            <a href={duplicate
              ? (dupIdentical
                  ? waLink(`Ciao Ania! Ho appena inviato nuovamente la mia richiesta per ${dupPrevSummary}. Vedo che ne avevo già inviata una uguale. Puoi considerare valida una sola richiesta. Grazie!`)
                  : waLink(`Ciao Ania! Ho già una richiesta per ${dupPrevSummary}, e ora ho inviato una nuova richiesta per ${selectedRoom ? `la ${selectedRoom.name}` : 'una camera'}, dal ${formatDate(form.checkIn)} al ${formatDate(form.checkOut)}. Mi aiuti a sistemare le due richieste? Grazie!`))
              : waLink(`Ciao Ania! Ho appena inviato una richiesta dal sito a nome di ${form.firstName} ${form.lastName}, per ${requestSummary}${!multiRoom && solution[0]?.roomName ? `, per la ${solution[0].roomName}` : ''}. Rimango in attesa della tua conferma. Grazie!`)}
              target="_blank" rel="noopener noreferrer"
              className="block w-full bg-green-700 hover:bg-green-800 transition-colors text-white font-semibold py-4 rounded-2xl text-sm mb-3">
              {duplicate ? 'Scrivi ad Ania su WhatsApp' : 'Scrivi su WhatsApp'}
            </a>
            <Link href="/" className="inline-block text-sm font-semibold text-[#23231e] underline py-2">Torna alla home</Link>
          </div>
        )}

        {step === 'error' && errorKind === 'full' && (
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-[#1f3d2f] mt-4 mb-7 text-balance">Ci dispiace, per queste date siamo al completo</h2>
            <p className="text-[#3a3a35] text-base mb-4">
              Dal <strong className="text-black">{formatPeriodo(form.checkIn, form.checkOut).replace(/^dal /, '')}</strong> tutte le nostre camere sono già occupate.
            </p>
            <p className="text-[#3a3a35] text-base mb-4">
              Se queste sono proprio le date che desideri, <strong className="text-black">non rinunciare ancora al tuo soggiorno.</strong>
            </p>
            <p className="text-[#3a3a35] text-base mb-9">
              Puoi lasciare ad Ania il tuo nome e numero di telefono su WhatsApp. <strong className="text-black">Se si dovesse liberare una camera, sarà felice di contattarti personalmente.</strong>
            </p>
            <button onClick={() => setStep('form')}
              className="block w-full bg-green-700 hover:bg-green-800 transition-colors text-white font-semibold py-4 rounded-2xl text-base mb-4">
              Prova con altre date
            </button>
            <a href={waLink(`Ciao Ania! Sul sito risulta tutto pieno ${formatPeriodo(form.checkIn, form.checkOut)}. Se dovesse liberarsi una camera, potresti avvisarmi? Mi chiamo ${form.firstName} ${form.lastName}. Grazie mille!`)}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 text-sm text-green-700 font-semibold underline py-2">
              <MessageCircle size={17} strokeWidth={2} aria-hidden="true" /> Scrivi ad Ania su WhatsApp
            </a>
          </div>
        )}

        {step === 'error' && errorKind === 'tech' && (
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-[#1f3d2f] mt-4 mb-4 text-balance">Qualcosa non ha funzionato</h2>
            <p className="text-[#3a3a35] text-base mb-2">La tua richiesta non è stata inviata.</p>
            {errorMsg && <p className="text-[#3a3a35] text-base mb-6">{errorMsg}</p>}
            <button onClick={() => setStep('form')}
              className="block w-full bg-green-700 hover:bg-green-800 transition-colors text-white font-semibold py-4 rounded-2xl text-sm mb-3">
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
