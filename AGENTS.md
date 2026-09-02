<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Casa Ania — come funziona il modulo /prenota (dal 02/09/2026)

- Il sito e il gestionale (repo gestionale-bnb) sono gestiti da una sola
  persona, Ania. Non esiste un secondo utente.
- Il modulo /prenota NON crea più prenotazioni su Supabase: verifica la
  disponibilità (lettura di `bookings`), poi manda la richiesta al gestionale
  con `POST /api/richieste/web` (segreto `RICHIESTE_WEB_SECRET`, URL in
  `GESTIONALE_URL`). È il gestionale ad avvisare Ania (notifica push e
  avviso sonoro Pushover) e a far preparare la proposta.
- Se il gestionale non risponde (401, 429, 5xx, timeout), il cliente vede
  comunque il messaggio di successo e Ania riceve su Pushover «Richiesta dal
  sito NON entrata nel gestionale» con i dati per inserirla a mano.
- Le variabili Supabase restano necessarie: disponibilità, controlli
  anti-doppione (tabella `richieste`) e statistiche visite (`/api/eventi`).
- Nei log mai nome, telefono o note dei clienti.
- Test: `npm test` (logica pura in `lib/richiesteGestionale.ts`).
