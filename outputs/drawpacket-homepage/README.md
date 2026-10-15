# DrawPacket — complete concept website

The approved Cycle Study homepage plus all 26 remaining routes in `ia-source.md`. This is a research-stage website and isolated synthetic demo, not an operating payment product. Production assets are ready for local preview and Vercel deployment; no backend connection is implied.

## Run and build

- `npm run dev -- --host 127.0.0.1 --port 4174`
- `npm run build` — builds client/SSR, prerenders all 27 routes, prepares the existing Sites worker.
- `npm run preview -- --host 127.0.0.1 --port 4175`
- `npm test` — five guarded demo state-machine checks.
- `npm run test:pages` — run after build; validates IA route count, unique headings, internal links, assets, module-specific intake links and branded recovery.
- `npm run test:sites` — four existing hosting/packaging checks.

## Vercel

Import the repository with `outputs/drawpacket-homepage` as the Root Directory. The included `vercel.json` runs `npm run build` and publishes `dist/client`. No environment variables are required for the concept preview.

## Architecture

- `src/App.jsx`: approved ten-chapter homepage; scroll-selected modules and distinct reversible entrances.
- `src/Router.jsx`: pathname routing with branded recovery. Links use real URLs and support refresh/back/forward.
- `src/pages/catalog.js`: all detail routes, module-specific content, sourced resources and section types.
- `src/pages/DetailPage.jsx`: hero, chapters, native scroll/GSAP/Lenis motion, reduced-motion fallbacks, pricing, source shelf, module selector and checklist.
- `src/pages/SiteChrome.jsx`: shared responsive navigation dialog and complete footer.
- `src/pages/InquiryForm.jsx`: local-only pilot, guided-demo and contact previews. Selected module is retained by query parameter. Optional qualification fields follow the IA.
- `src/pages/DemoQueue.jsx`: ten fixed fictional records, search, filters, sorting, empty state and read-only source summaries. PA-07 preserves the interactive guarded review.
- `src/components/Demo.jsx` and `src/lib/demo.js`: deterministic evidence, correction, waiver/COI review, override, packet and simulated approval flow.
- `scripts/prerender.mjs`: route-specific HTML, titles and descriptions; local assets, favicon, noindex.

## Routes

Home; why draws return; offerings; Pay App Check; Change Evidence; Waiver Tracking; Compliance Holds; Owner Packet; how it works; use cases; demo; pilot; request pilot; request demo; controls; workflow fit; validation; resources; waiver guide; draw evidence checklist; about; contact; demo access; privacy; terms; accessibility; 404.

Every route is listed in `src/pages/catalog.js` and linked from the navigation or footer. The homepage retains its chapter index and quick demo/pilot dialogs.

## Honest service boundaries

All demo records are fictional. No real payment, signature, send, filing, ERP/bank write or authentication is implemented. Pricing is explicitly hypothetical. Forms use native validation, separate opt-ins and a local preview result; they do not transmit contact data or create leads. Privacy/deletion and accessibility inquiry routes are also previews. No verified profile URL, live integration, certification, customer proof or performance result is invented.

Before live collection: confirm legal entity/contact, processors, retention, service terms, form delivery and consent storage. Before a paid pilot: agree state-specific templates, sample permission, named AP owner, funded scope and reviewed validation criteria. Domain/deployment and profile creation remain separate work.

## Verification

Desktop browser review at 1440×900; mobile route checks at 390×844; actual in-app panel restored after QA. Route/assets checks, 5 demo tests and 4 hosting tests pass. Tested: module03-to-intake retention; local request result; menu Escape/focus return; checklist counter; PA-06 rejection summary; PA-07 comparison; queue no-results/reset; reduced motion removes pins/masks and uses static illustration posters.

Browser proof and QA JSON are in `qa/`. Primary captures: `waiver-page-desktop.png`, `pilot-page-desktop.png`, `full-site-demo-desktop.png`, `owner-packet-mobile.png`, `checklist-mobile.png`.
