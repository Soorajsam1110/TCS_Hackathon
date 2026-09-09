# CampLoop — campus sustainability assistant

Hackathon prototype. One place for a campus to **keep used things in circulation**, get
straight answers on **waste and energy**, and sign up for **green campus activities**.

## Run

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # static bundle in dist/
```

## What is in it

| Tab | What it does |
|---|---|
| **Overview** | Hero CO₂e figure, KPI row, hall Energy Sprint meters, listings-by-category chart (with table view) |
| **Exchange** | Post / browse / claim used items and post *wanted* requests. Search + category + claimed filters |
| **Assistant** | Rule-based sustainability assistant: which bin, how to save energy, and reuse-before-recycle routing into live listings |
| **Community** | Repair Cafés, swap markets, clean-ups, energy sprints — join for points; hall leaderboard + badges |

## Architecture

```
src/
  data/seed.js       demo listings, activities, categories (kg CO₂e per category), leaderboard
  data/kb.js         knowledge base: 19 disposal entries + 9 energy entries
  lib/assistant.js   keyword-scored intent router + askAssistant() async seam
  lib/store.js       useStore(): state, localStorage persistence, points and impact math
  components/        Topbar, Overview, Exchange, Assistant, Community, PostModal
```

State lives in `localStorage` under `camploop.v1` — no backend needed for the demo, and
new seed content still shows up for returning visitors. Toggle the ☾ button for dark mode.

### The assistant

Fully offline and deterministic: no key, no network, nothing to fail on stage. It scores the
question against keyword sets, then routes to whichever intent wins — **live listings**
(`"I need a desk lamp"` → real inventory), **disposal**, **energy**, **activities**, or
**impact stats**. Answers carry action chips that deep-link into the other tabs.

To go live with a model, replace the body of `askAssistant(query, ctx)` in
`src/lib/assistant.js` with a call to a **server-side proxy** (never ship an API key to the
browser) and keep `respond()` as the fallback on error.

### Numbers

CO₂e and mass figures are per-category embodied-carbon averages in `seed.js` / `store.js` —
order-of-magnitude estimates for a demo, not audited factors. Swap them for your
institution's own figures before showing this to a sustainability office.

## Data-viz notes

Chart colors come from a CVD-validated 3-slot categorical palette
(`#2a78d6` / `#eb6834` / `#1baf7a`), validated all-pairs in light and dark. Single-measure
charts use one hue; every bar is direct-labeled and the category chart ships a table view,
since the aqua slot sits under 3:1 contrast on the light surface.
