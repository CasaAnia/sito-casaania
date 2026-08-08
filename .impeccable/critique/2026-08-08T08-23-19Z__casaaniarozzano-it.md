---
target: sito live casaaniarozzano.it
total_score: 18
max_score: 36
na_heuristics: 7
p0_count: 1
p1_count: 5
timestamp: 2026-08-08T08-23-19Z
slug: casaaniarozzano-it
---
# Critica combinata — casaaniarozzano.it

Method: dual-agent (A: design review · B: detector + browser evidence)

## Punteggi Nielsen (A)

| # | Euristica | Voto | Problema chiave |
|---|---|---|---|
| 1 | Visibilità stato | 2 | Nessun indicatore slide carosello; conferma invio sparisce al refresh |
| 2 | Mondo reale | 3 | "Tripla Lena" per 4 persone, "Singola Amelia" per 2 |
| 3 | Controllo/libertà | 2 | Carosello non controllabile; camere non collegate tra loro |
| 4 | Coerenza | 1 | "PRENOTA ORA" porta a /prenota in home ma apre WhatsApp nelle pagine camere; FAB icona vs emoji |
| 5 | Prevenzione errori | 2 | Telefono senza validazione; doppio invio possibile; bug UTC min-date |
| 6 | Riconoscimento | 2 | Nel form camere solo nome+prezzo, senza foto/attributi |
| 7 | Flessibilità | n/a | Superficie Persuade a flusso unico |
| 8 | Estetica | 3 | Home rullo di ~10 sezioni; schermate quasi vuote su mobile |
| 9 | Recupero errori | 0 | Ogni errore tecnico mostrato come "Tutte le camere esaurite"; errorMsg mai renderizzato; /camere 404 inglese |
| 10 | Aiuto | 3 | FAQ buone ma zero info su pagamento e cancellazione |
| **Totale** | | **18/36 (50%)** | **Accettabile (al limite)** |

Audit tecnico (B): Accessibilità 2, Performance 1, Responsive 3, Theming 1, Integrity 2 = **9/20 (Poor)**.
Detector CLI: exit 0, 0 findings (pass genuino ma non copre i problemi trovati a mano). Nessun overlay (target = URL live).

## Specificità
Contenuto su misura (7/10): "palazzina 8", 140 metri, sezione accessibilità onesta. Forma intercambiabile (3/10): estetica Tailwind "boutique hospitality" standard; logo approvato (Didot+Futura #007f5b) scollegato dai font/verde del sito; Ania mai mostrata.

## Classifica problemi

**P0 — errorMsg mai renderizzato** (PrenotaClient.tsx:336-345): ogni errore di rete/500 = "Tutte le camere sono esaurite". L'API distingue 503/400/409, il client butta via tutto.

**P1**
1. API abusabile (app/api/prenota/route.ts): no rate-limit, no validazione telefono, `in_attesa` blocca l'inventario, doppio submit crea duplicati reali; extraBed ignorato lato server → totali sbagliati per 3-4 persone.
2. Immagini non ottimizzate: 0 next/image, 13 <img> raw, 1 solo lazy; home 1,85 MB di immagini, /camere/ambra 10 JPEG full-res eager (1,8 MB); pubblico 90% mobile.
3. /prenota si auto-sabota: doppio bottone verde identico Prenota/WhatsApp + claim "è il modo più veloce"; 4 uscite WhatsApp sulla pagina di conversione.
4. Form: label senza htmlFor (5 campi labeled:false), input 30-38px alti, font 12-14px → zoom iOS; 20 touch target <44px in home.
5. Zero informazioni su pagamento/caparra/cancellazione in tutto il sito; "Prenota" vs "Richiesta inviata" ambiguo.

**P2**
6. /camere = 404 Next default in inglese; nessuna not-found custom; navigazione tra pagine inesistente.
7. Gerarchia heading: /recensioni senza H1; home salta H1→H3; contrasto footer 4,25:1 (sotto AA).
8. FAB WhatsApp copre i prezzi su mobile (card Allegra) con pulse ogni 5 s.
9. Theming: 274 hex hard-coded vs token definiti e ignorati; dark mode boilerplate a metà; Geist+Geist Mono caricati e mai usati (162 KB font totali).
10. Iframe Maps carica cookie terze parti senza consenso preventivo; nessun link privacy nel form (GDPR art. 13).
11. Testi: "Bagno schiuma"→"Bagnoschiuma" (4 pagine camere), "biancheria di bucato fresca e accurata", "ti confermiamo in pochi minuti", "140 passi" vs "140 metri", prezzi letto aggiuntivo incoerenti home/form, recensione "Casa Granata" senza contesto.

**P3**: hero-mobile.jpg orfano (321 KB), public/ 12 MB, apostrofi misti '/’, card Lena object-contain con hack pt-4/pt-9, paragrafo balcone duplicato verbatim Lena/Amelia, alt "Camera Singola" per Amelia, QR recensioni solo desktop.

## Punti di forza
1. Posizionamento di nicchia serio (Humanitas, guida SEO dedicata).
2. Onestà come design (rampa non motorizzata, "sei tu a giudicare").
3. Igiene tecnica: SEO/JSON-LD curati, reduced-motion ovunque, alt completi, no overflow a 375px, console pulita.

## Personas
Casey: 1,7 MB eager su 3G, header sticky 145px, input minuscoli, bottone finale ambiguo, FAB copre i prezzi.
Jordan: "PRENOTA ORA" → WhatsApp vuoto senza preavviso; 4 persone → "Tripla"; nessuna info pagamento.
Riley: back+resubmit = prenotazioni duplicate reali; telefono "aaa" accettato; bug UTC all'1 di notte; refresh post-invio = tutto sparito.

## Domande
1. Il form esiste per l'ospite o per il gestionale? Due percorsi mediocri invece di uno eccellente.
2. Perché "Prenota" promette ciò che il sistema non mantiene?
3. Chi è Ania? Citata dodici volte nelle recensioni, mai mostrata.
