# Collet — landing site (Next.js)

The Collet marketing site, refactored from the original static HTML to Next.js
(App Router, TypeScript). The UI is an exact port of the original pages.

## Routes

| Route         | Page                          | Source (original)     |
| ------------- | ----------------------------- | --------------------- |
| `/`           | For property managers (main)  | `legacy/managers.html`|
| `/landlords`  | For landlords / owners        | `legacy/index.html`   |

## Waitlist API

Both signup forms POST to the Spring Boot `WaitlistApi` (`POST /v1/waitlist`)
with the shape it expects:

```json
{ "email": "you@email.com", "metadata": { "location": "Lekki, Lagos", "units": "2 to 5", "source": "landlords" } }
```

The email is the required field; every other answered field (location, units,
agency, etc.) is passed through the API's free-form `metadata` map. On success
the form swaps to the "You're on the list" state; on failure it alerts.

The endpoint is configured in `src/config.ts` and overridable per environment:

```bash
# .env.local — production default is https://api.usecollet.com/usecollect-api/v1/waitlist
NEXT_PUBLIC_WAITLIST_API=http://localhost:8081/usecollect-api/v1/waitlist
```

The backend already allows `http://localhost:3000` via CORS for local dev.

## How the UI stays pixel-identical

Each page renders the original markup verbatim (server-rendered for SEO) and is
hydrated with the original behavior — sticky-nav scroll state, the scroll-reveal
`IntersectionObserver`, and the two forms — via `src/components/colletRuntime.ts`.

The original inline CSS is split into:

- `src/app/globals.css` — shared resets, `:root` tokens, keyframes, and the
  global responsive / reduced-motion rules (identical across both pages).
- `src/components/owner.css` / `mgr.css` — each page's styles, scoped under a
  `.owner` / `.mgr` wrapper class so the two pages' overlapping class names never
  collide when both stylesheets are bundled.

The original HTML is kept in `legacy/` for reference.

## Develop

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build && pnpm start
```
# usecollet-landing
