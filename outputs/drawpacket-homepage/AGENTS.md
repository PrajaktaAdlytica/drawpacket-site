# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Confirmed motion direction

The user rejected simple reveal animations as insufficient. Each homepage chapter must feel like a separate page, with an obvious scroll-driven handoff in both directions. Test the actual narrow in-app preview as well as desktop. Do not disable the main story transitions behind a large desktop viewport gate. Preserve native scrolling and reduced-motion fallbacks.

Keep a clear full-page reading interval between handoffs so the following chapter does not immediately peek into the settled page. Preserve reversible motion and natural scrolling for tall chapters.

Each chapter must have a distinct reversible entrance (not repeated vertical slides). The offerings chapter must advance 01–05 on downward scroll and reverse on upward scroll, while preserving direct tab selection. Keep tabs and preview together in the reading stage.

## Complete-site scope
The user approved the homepage visual/motion system and requested every remaining route from ia-source.md. Preserve the Cycle Study identity across all pages. Shared navigation/footer now live in src/pages/SiteChrome.jsx; route content lives in catalog.js. Prerender every route. Keep real URLs, local-only form disclosures, synthetic queue/demo states and no payment execution. Run the page-route audit after building when adding or changing routes.

## Approved opening film

The user selected option 3, The Review Aperture, from outputs/drawpacket-intro-direction. The homepage now opens with a seven-second oxblood/chalk typographic shutter film above the original hero. Preserve native scrolling, skip/pause/replay, a static reduced-motion poster and pending human review. Author film changes in video/ and render desktop and portrait versions into public/media. Use the original Cadence SVG and website fonts, not generated storyboard lettering. The hero entrance begins when it enters the viewport. Remotion rendering on this Mac uses --chrome-mode=chrome-for-testing; the bundled headless-shell failed to start.

The opening film must occupy the full viewport without the website navigation. When normal playback completes, advance smoothly to the hero and reveal the navigation there. Skip remains available inside the film, and reduced-motion mode keeps the still preview with a manual Enter the month action.
