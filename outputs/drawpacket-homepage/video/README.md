# DrawPacket / The Review Aperture

Approved storyboard: option 3 in `../drawpacket-intro-direction/03-review-aperture.png` (relative to the homepage project root's parent outputs directory).

Seven-second silent opening film, 30 fps. Desktop: 1920×1080. Portrait: 1080×1350. Scenes: datum, month, evidence, pending review, original Cadence wordmark, chalk title reveal. No payment or approval completes in the film.

The film uses the original SVG brand assets and local website fonts. The generated storyboard is a visual reference only; none of its approximate lettering is embedded in the final movie.

## Preview

From the homepage project root:

```sh
npx remotion studio video/index.jsx --no-open --port=4180
```

## Render

On this Mac, use Chrome for Testing; bundled headless-shell crashed during initialization.

```sh
npx remotion render video/index.jsx ReviewAperture public/media/drawpacket-intro-desktop.mp4 --codec=h264 --crf=20 --concurrency=1 --chrome-mode=chrome-for-testing
npx remotion render video/index.jsx ReviewApertureMobile public/media/drawpacket-intro-mobile.mp4 --codec=h264 --crf=20 --concurrency=1 --chrome-mode=chrome-for-testing
npx remotion still video/index.jsx ReviewAperture public/media/drawpacket-intro-poster-desktop.jpg --frame=180 --chrome-mode=chrome-for-testing
npx remotion still video/index.jsx ReviewApertureMobile public/media/drawpacket-intro-poster-mobile.jpg --frame=180 --chrome-mode=chrome-for-testing
```

Rendering must finish before `npm run build` so the static site receives all media. Remotion is a development dependency only; its runtime is not shipped in the website bundle.

## Website behavior

`src/components/IntroFilm.jsx` sits immediately before `#opening`. Native scrolling is always available. The movie plays once when visible, pauses offscreen/in a hidden tab, and offers pause/replay plus a keyboard-accessible skip. Skip focuses the original hero heading. Reduced motion loads a still poster instead of a video element. The original hero's entrance waits until it enters the viewport. The final title frame holds until the visitor continues; the page never auto-scrolls.

## Verified output — 15 October 2026

- Desktop MP4: H.264, 1920×1080, 30fps, 7.000s, 497,960 bytes.
- Portrait MP4: H.264, 1080×1350, 30fps, 7.000s, 416,524 bytes.
- Silent tracks by design. Original fonts and logo; synthetic record disclaimer in data scenes.
- Browser checks at 1440×900, 775×804 and 390×844: responsive source selection, no horizontal overflow, no following-section peek while at the intro's top.
- Verified autoplay, completed state, replay, manual pause, skip-to-hero focus, native scroll, and reduced-motion poster replacement.
- Production build and all 13 existing demo/route/hosting tests passed.
