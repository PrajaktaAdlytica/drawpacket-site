# DrawPacket website and brand system

DrawPacket is a research-stage concept for reviewing one general-contractor draw, its supporting evidence, and the decisions still open. This repository contains the complete responsive concept website, deterministic synthetic demo, source brand kit, logo exploration, visual directions, and intro-film source.

All companies, people, records, amounts, and outcomes shown in the product preview are fictional. The site does not sign waivers, release payments, write to an ERP or bank, or provide statutory lien advice.

## Repository map

- `outputs/drawpacket-homepage` — deployable React/Vite website and Remotion intro source
- `outputs/drawpacket-brand-kit` — logos, favicons, typography, color tokens, icons, backgrounds, illustrations, and usage guidance
- `outputs/drawpacket-intro-direction` — opening-film direction and storyboards
- `outputs/drawpacket-logo-directions*` — earlier logo explorations and research prompts
- `outputs/drawpacket-visual-directions*` — visual concept studies and generation prompts

Generated ZIP archives, dependencies, build output, caches, and scratch files are intentionally excluded from Git.

## Run the website

```bash
cd outputs/drawpacket-homepage
npm ci
npm run dev
```

Build and verify the release:

```bash
npm run build
npm test
npm run test:pages
npm run test:sites
npm audit --omit=dev --audit-level=high
```

The production build is written to `outputs/drawpacket-homepage/dist/client` and prerenders the homepage plus 26 detail and recovery routes.

## Vercel project settings

Import this GitHub repository and set the Root Directory to `outputs/drawpacket-homepage`. The included `vercel.json` defines the Vite build command and `dist/client` output. No environment variables are required for this concept preview.

The inquiry forms are intentionally local previews. Connect a reviewed form processor, privacy policy, retention policy, consent storage, and deletion route before collecting real leads.
