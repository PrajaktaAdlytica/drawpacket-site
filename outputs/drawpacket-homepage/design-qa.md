# DrawPacket homepage design QA

Scope: complete homepage, synthetic demo and local intake preview. Validation date: 15 October 2026. The browser was checked at 1440 × 900, 1024 × 768 and 390 × 844, plus the app’s 775 × 804 preview panel.

## Visual source and interpretation

The primary visual source is the supplied “ChatGPT Image 15 Oct 2026, 17_08_21.png”, retained as `qa/reference.png`. The approved local brand kit supplies the Cadence logo, icons, palette and supporting assets. The IA supplies the ten-chapter structure.

The implementation preserves the reference’s split editorial hero, chalk surface, oxblood condensed heading, October columns, lilac PA-07 ribbon, amber missing-waiver hold, amount comparison and named reviewer. The original image’s compressed stacked composition becomes full-height story chapters as requested. The approved Cadence lockup replaces the image’s plain wordmark. The scenario uses a fixed 05 October reference date rather than a misleading “today” label. The exact typeface from the image was not supplied; the licensed Stint Ultra Condensed is an approximation with appropriate narrow proportions, not a CSS-stretched font.

## Captured evidence

- `qa/homepage-desktop.jpg` — production build at 1440 × 900.
- `qa/mobile-home.jpg` and `qa/mobile-demo.jpg` — 390 × 844, plus the app’s 775 × 804 preview panel.
- `qa/tablet-home.jpg` — 1024 × 768.
- `qa/desktop-*.jpg` — all ten chapters with reduced motion enabled for stable visual inspection.
- `qa/chapter-overview.jpg` — chapter contact sheet.
- `qa/reference-comparison.jpg` — source hero crop beside the implemented chapter. Each is proportionally resized to 708 px width; neither is stretched to manufacture a pixel match.
- `qa/source-provenance.jpg` — evidence dialog.
- `qa/DEMO-BP04-owner-packet.txt` — browser-downloaded synthetic export sample.

## Findings resolved

| Finding | Resolution |
| --- | --- |
| Initial display type wrapped the hero into three lines | Selected a genuinely condensed open-source face and restored the intended two-line desktop heading |
| Native dialog closed during development effect replay | Removed the cleanup close; verified actual open, Escape, close button and opener-focus restoration |
| Anchor targets retained excess header spacing | Removed duplicate scroll padding; chapter targets align to the viewport while internal padding clears the header |
| Story index could get ahead of pinned content | Derive active chapter from its actual viewport bounds after scroll |
| Reconciliation rows began with low contrast | Keep initial text opaque and animate a small positional offset |
| Longer desktop chapters exceeded the intended scene height | Tightened module and FAQ rhythm; retained natural overflow instead of clipping content |
| Missing waiver displayed an invalid date suffix | Render “Not received” instead of a fabricated received date |
| Form preview discarded values when returning to edit | Keep the form mounted while showing the local preview result |
| Display numerals were too narrow in product values | Use tabular mono for calendar and workspace amounts |
| Synthetic label could scroll away inside the demo | Keep DEMO — SYNTHETIC DATA in the sticky dialog header |

## Functional verification

- Production build succeeds and prerenders ten chapters into HTML.
- Five deterministic demo tests pass: coherent arithmetic; no skipped approval gates; loading does not accept evidence; either evidence-review order requires both approvals; rejected override and reset behavior.
- Four hosting-worker tests pass.
- Browser production load has no console errors or hydration warnings.
- No broken loaded images or horizontal page overflow at checked widths.
- Chapter links, module pointer selection and arrow-key selection work.
- Source dialog exposes the version, source lines, fictional reviewer and pending GC authority; Escape closes it.
- The full demo path was exercised through comparison, holds, rejected override, rationale, distinct waiver/COI loading and acceptance, draft, explicit GC acknowledgement and local export.
- Empty rationale and unacknowledged GC approval remain disabled.
- Pilot form required email, company, role and consent are enforced. Preview says nothing was submitted. Editing retains the fields; closing clears the dialog.
- Mobile menu opens and closes after navigation. Mobile dialog keeps its close control, labels and action reachable.
- The motion revision has nine page handoffs without a large-screen gate. Reduced-motion mode removes all nine pins and preserves all content. Tall chapters finish their normal reading scroll before their last viewport holds.

## Practical limits

This is a local homepage implementation. No production backend, published domain, verified social profiles or live lead delivery is represented. The reference typography is closely interpreted rather than an exact proprietary-font match. Mobile chapters grow to fit their content; scroll is not forcibly locked to one gesture per chapter. The screenshots and manual checks are not a claim of exhaustive cross-browser or assistive-technology certification.

Core text contrast checks are recorded in `qa/color-contrast.json`: ink/chalk 14.40:1; muted/chalk 5.75:1; oxblood/chalk 9.96:1; hold/amber 4.59:1. These cover base color pairs, not every transient rendered state.

## Scroll motion revision

The user rejected the original reveals as insufficient. The revision replaces the two large-screen-only pins with nine layered chapter transitions. At a 1440 × 900 viewport, scrolling from 0 to 450 px leaves the outgoing hero at top 0, places the incoming evidence page at top 450 and scales the outgoing content to 0.965. Reverse scrolling restores the preceding state. The actual 775 × 804 preview now has nine active handoffs instead of zero. The reduced-motion toggle was verified to remove all nine pins. See `qa/page-transition-desktop.jpg`.

Final result: passed for the requested local homepage scope, subject to the explicit limits above.

## Chapter settling refinement
Added a 40svh reading interval before each of the nine handoffs. The current chapter remains pinned across this interval, covering the gap; the next chapter stays below the viewport. Tall chapters retain their full native reading scroll. Reduced motion creates neither pins nor gaps. Header now spells out October 2026. At 1440 × 900, scrollY 1440 holds evidence at top 0 while variance remains at top 1081 (below the viewport). Screenshot: `qa/chapter-hold-desktop.png`.

## Distinct entrances and scroll-selected offers
Nine entrances now use left/right wipes, a center split, a horizontal shutter, an off-center iris, a bottom reveal, a side curtain, a top shutter, and a centered iris. Content enters with corresponding lateral/angled movement. All are scroll-scrubbed and reversible. Offerings reserves 200svh for five module selections plus its 40svh reading beat. At 775×804 the full offer stage fits the viewport: module 03 at scrollY5521.5, module 05 at6325.5, with workflow still below screen (top1246.875). Direct click/keyboard selection remains available.

Reveal masks use per-chapter CSS custom properties on the site root, keeping them separate from GSAP pin style restoration. Entrance triggers measure static spacer positions. Phone verification: module 04 remains readable with panel bottom833px in844px viewport; no horizontal overflow. Keyboard ArrowDown advances a manually selected module02 to03.

## Complete-site extension
Built the 26 additional IA routes (25 content routes plus recovery), retaining the approved homepage. Shared navigation/footer connect the five module pages, workflow/use cases, standalone demo, pricing/intake, controls/validation, resources, company, demo access, legal and accessibility pages. Each hero uses its dedicated Cycle Study vector illustration, headline and scene treatment. Story pages use reversible root-driven reveal masks and 40svh reading intervals; forms, legal reading and the workspace retain ordinary reading flow. Reduced motion replaces animated hero assets with static posters and removes pins/masks.

The /demo page includes all ten fixed IA records, with explicit synthetic source dates/versions/anchors for secondary records. Search, initial-state filtering, sorting and empty-state recovery work. Only PA-07 is an editable simulation; secondary records are read-only summaries. Queue starting states are labeled as a fixed snapshot and never presented as changing live telemetry.

Verified all 26 routes in desktop and 390px browser checks. Initial transient hero overflow on demo/accessibility was corrected by clipping horizontal entrance overflow at the detail-site boundary. No missing assets or hydration errors observed. Pilot module 03 arrives correctly, local form result states nothing was submitted, menu Escape returns focus, two checklist items show 02/10, PA-06 rejection and PA-07 compare are functional. Build + 5 demo tests + 4 route tests + 4 hosting tests pass.

Official-source refresh: Perplexity search of California CSLB on 15 October 2026 confirmed the current official conditional/unconditional and progress/final distinctions. The resource guide links the original CSLB page, treats California as an example and leaves form interpretation with GC/counsel.

## Workflow illustration readability
Corrected the workflow hero and static poster for their light rose surface. Outside labels and 01–03 numerals now use oxblood; project context uses near-black. Card text remains pale on dark. Top labels increased from 11 to 13 SVG units; card secondary labels from 12 to 14. Connecting rules darkened. Contrast on #EADDE0: oxblood8.25:1, near-black11.93:1, rules4.91:1; pale card text9.22:1 or higher on #4A2A35. Entry motion no longer fades text from low opacity. Synced source brand-kit assets.

## Pilot pricing hover
Applied brand-kit sample-card treatment to both pricing cards: oxblood border and 0 12px 32px #321c260d shadow over240ms. Discuss-the-scope CTAs use opposing vertical lilac shutters over380ms, preserving stable action text. Keyboard focus within activates the card; CTA focus shows the shutter. Reduced motion keeps immediate state changes. Card hover is restricted to hover-capable pointers.

## Navigation pilot CTA
Discuss a pilot is now a filled oxblood button with opposing lilac shutters (380ms), stable label, and arrow exchange. Hover and keyboard focus share the treatment; reduced motion removes transitions. The CTA remains visible at tablet widths including775px. Narrow mobile uses the same styled CTA in the navigation dialog. The primary navigation collapses before the full row becomes crowded.


## 2026-10-15 — Review Aperture opening film

Added the user-selected option 3 as a seven-second silent MP4 above the hero, with desktop and portrait encodes, original logo/font assets, pause/replay/skip, offscreen pause and a reduced-motion poster. Browser QA at 1440×900, 775×804 and 390×844 confirmed responsive source selection, no horizontal overflow and an intro ending at the viewport bottom. Skip pauses the movie and focuses the hero heading. Reduced motion removes the video element. The existing hero entrance now starts on viewport entry. Both files are H.264 at 30 fps and under 0.5 MB. Build and all 13 existing tests passed.

## 2026-10-15 — Release QA and GitHub handoff

Updated Vite from 6.4.2 to 6.4.4 to clear the final high-severity build-tool advisory. `npm audit --omit=dev --audit-level=high` reports zero vulnerabilities. A clean production build prerenders the homepage and 26 additional routes. The five demo tests, four page/asset tests and four hosting tests all pass. Repository hygiene excludes dependencies, generated builds, caches, scratch files and duplicate ZIP archives; no environment files or tracked files over 50 MB were found. Added an explicit Vercel configuration for the nested application root and `dist/client` output.
