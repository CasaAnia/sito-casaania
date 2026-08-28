'use client'

type SiteEventType =
  | 'visita'
  | 'whatsapp'
  | 'telefono'
  | 'modulo_iniziato'
  | 'richiesta_inviata'
  | 'richiesta_errore'

type Attribution = { fonte: string; campagna: string | null }

const NOSTRI_DOMINI = ['casaaniarozzano.it']
const ATTRIBUTION_KEY = 'casa_ania_provenienza'

// Conserva per la sola scheda aperta la provenienza della visita. Non viene
// creato alcun identificativo e non è possibile riconoscere una persona tra
// sessioni diverse: serve soltanto a non perdere la campagna quando l'ospite
// passa dalla homepage al modulo.
function attribution(): Attribution {
  const params = new URLSearchParams(window.location.search)
  const campagna = (params.get('utm_campaign') || '').slice(0, 80) || null
  const utmSource = params.get('utm_source')

  let current: Attribution | null = null
  if (utmSource) current = { fonte: utmSource.toLowerCase().slice(0, 80), campagna }
  else if (params.get('gclid')) current = { fonte: 'google-ads', campagna }
  else if (document.referrer) {
    try {
      const host = new URL(document.referrer).hostname.replace(/^www\./, '').toLowerCase()
      if (!NOSTRI_DOMINI.includes(host)) current = { fonte: host.slice(0, 80), campagna }
    } catch {
      current = { fonte: 'sconosciuto', campagna }
    }
  }

  try {
    if (current) sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(current))
    const saved = sessionStorage.getItem(ATTRIBUTION_KEY)
    if (saved) return JSON.parse(saved) as Attribution
  } catch {
    // Il browser può bloccare lo storage: il conteggio continua comunque.
  }

  return current ?? { fonte: 'diretto', campagna: null }
}

export function sendSiteEvent(tipo: SiteEventType, pagina: string) {
  const { fonte, campagna } = attribution()
  const body = JSON.stringify({ tipo, pagina, fonte, campagna })

  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/eventi', new Blob([body], { type: 'application/json' }))
      return
    }
    fetch('/api/eventi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    })
  } catch {
    // Le statistiche non devono mai disturbare la navigazione o la richiesta.
  }
}
