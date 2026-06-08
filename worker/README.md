# "Ask Ben" — Cloudflare Worker

Server-seitiger Backend-Endpoint für den KI-Assistenten auf der Portfolio-Seite.
Nutzt **Cloudflare Workers AI** (Llama 3.1 8B) im kostenlosen Tageskontingent
(10.000 Neurons/Tag). Der API-„Key" ist hier nicht nötig — Workers AI wird über
das `AI`-Binding angesprochen, der Schlüssel verlässt nie Cloudflare.

## Deployment (einmalig)

Voraussetzung: ein (kostenloser) Cloudflare-Account.

```bash
# 1. Wrangler installieren (Cloudflares CLI)
npm install -g wrangler

# 2. Einloggen (öffnet den Browser)
wrangler login

# 3. In diesen Ordner wechseln
cd worker

# 4. KV-Namespace für das Rate-Limiting anlegen
wrangler kv namespace create RL
#    -> gibt eine id aus. Diese id in wrangler.toml bei
#       [[kv_namespaces]] -> id = "..." eintragen.

# 5. Deployen
wrangler deploy
#    -> gibt die Worker-URL aus, z.B.
#       https://ask-ben.DEIN-SUBDOMAIN.workers.dev
```

## Frontend verbinden

Die ausgegebene Worker-URL in die Portfolio-`.env.local` eintragen:

```
VITE_ASK_BEN_ENDPOINT=https://ask-ben.DEIN-SUBDOMAIN.workers.dev
```

Danach neu bauen (`npm run build`) und hochladen. Ohne diese Variable bleibt
das Chat-Widget sichtbar, antwortet aber mit einem freundlichen
„noch nicht aktiviert"-Hinweis (kein Fehler).

## Wichtige Anpassungen

- **`ALLOWED_ORIGINS`** in `ask-ben.js`: muss exakt deine Live-Domain(s)
  enthalten. Aktuell: `adamo.de`, `www.adamo.de`, die GitHub-Pages-URL und
  `localhost:5173` (Dev). Fremde Origins werden mit 403 abgewiesen — das
  verhindert, dass andere deinen Endpoint als Gratis-LLM missbrauchen.
- **`CV_CONTEXT`** in `ask-ben.js`: der Wissensstand des Bots. Bei CV-Änderungen
  hier nachziehen (er antwortet ausschließlich aus diesem Text).

## Sicherheitsmaßnahmen (eingebaut)

| Schutz | Umsetzung |
|---|---|
| Prompt-Injection (strukturell) | Nutzertext in `<user_question>`-Delimiter gekapselt, Delimiter aus Eingabe entfernt, System-Prompt behandelt Eingaben als untrusted Daten und verweigert Rollenwechsel/Prompt-Leak |
| Prompt-Injection (Kurzschluss) | Bekannte Jailbreak-Muster (DE+EN) werden erkannt → **Modell wird gar nicht erst aufgerufen**, feste themenlenkende Absage |
| Prompt-Injection (Output-Guard) | Antwort wird verworfen, falls das Modell System-Prompt/Kontext/Delimiter leakt → Absage statt Leak |
| Grounding (keine Halluzinationen) | Antwort nur aus `CV_CONTEXT`, sonst „weiß ich nicht" + Mail-Hinweis |
| Sinnlos-/Spam-Eingaben | Gibberish/Symbol-Müll wird client- **und** serverseitig abgewiesen (422), bevor das Modell läuft |
| 30-Sekunden-Sperre | 1 Anfrage / 30 s pro IP (KV-Cooldown) → 429; Client zeigt zusätzlich Countdown |
| Endpoint-Missbrauch | CORS-Allowlist (nur eigene Domains), nur POST |
| Tageslimit | 60 Anfragen/Tag pro IP via KV → 429 |
| Eingabe-Grenzen | max. 500 Zeichen, History server-seitig auf 6 Turns gekappt |
| Ausgabe | `max_tokens` begrenzt, Temperatur 0.2; Frontend rendert reinen Text (kein HTML → kein XSS) |

### Optionale Härtung (empfohlen, wenn die Seite öffentlich/viel besucht ist)

- **Cloudflare Turnstile** (kostenloses, unsichtbares CAPTCHA) vor den Endpoint
  schalten — stärkster Schutz gegen automatisierten Missbrauch.
- Rate-Limits in `ask-ben.js` (`RL_PER_MIN`, `RL_PER_DAY`) bei Bedarf senken.

## CSP-Hinweis

Die Seite hat eine strikte Content-Security-Policy (`.htaccess`). Der Browser
ruft den Worker direkt auf, daher muss dessen Host in `connect-src` erlaubt sein.
Ergänze in `public/.htaccess` in der `Content-Security-Policy`-Zeile bei
`connect-src` den Worker-Host, z.B.:

```
connect-src 'self' https://api.web3forms.com https://ask-ben.DEIN-SUBDOMAIN.workers.dev
```

(Alternativ den Worker per Custom-Route unter `adamo.de/...` betreiben — dann
deckt `connect-src 'self'` ihn ab und es ist keine CSP-Änderung nötig.)

## Datenschutz

Die Nutzereingaben werden zur Beantwortung an Cloudflare Workers AI übermittelt.
Das sollte in der Datenschutzerklärung (`src/pages/Datenschutz.tsx`) ergänzt
werden, bevor die Seite öffentlich live geht.
