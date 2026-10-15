# Hero Assets & Licensing

This document records the source and licensing information for the assets used
in the Homepage Hero (`Packaging the Nation`). It is intentionally minimal —
these are placeholder/creative assets intended to be replaced later with
official MPB photography.

## Summary

All packaging artwork used by the hero is original vector artwork defined
inline in: `packagingArt.tsx`.

No third-party branded photography is used in the hero.

The SVG renders are intentionally unbranded and designed to match MPB's
existing palette and visual identity.

## Files and provenance

`packagingArt.tsx` — Original SVG artwork drawn specifically for this
project. Each pack (StandUpPouch, GussetPouch, PillowPouch, BreadBag,
ShrinkSleeve, RollStock, FlowWrapBread) is an SVG group (`<g>`) rendered on
a shared 400×520 canvas.  License: Original artwork created for MPB — no
external license required.

Image assets used by the new image-based hero (existing project files):

- `src/assets/Images/hero/hero1.png` — used for `Stand-Up Pouches`
- `src/assets/Images/hero/hero2.png` — used for `Gusset Pouches`
- `src/assets/Images/hero/hero3.png` — used for `Pillow Pouches`
- `src/assets/Images/hero/hero4.png` — used for `Sleeves`
- `src/assets/Images/hero/flour.png` — used for `Bread Packaging`
- `src/assets/Images/hero/coffee.png` — used for `Roll Stock`
- `src/assets/Images/hero/petfood.png` — used for `Bread Flexible Packaging`

These files were inspected in the repository and mapped into `HERO_IMAGES`
in `src/data/heroImages.ts`. They are used as the primary visual assets for
the hero showcase. If any of these require replacement with official
photography, update `src/data/heroImages.ts` with the new paths and alt text.

`packagingFormats.ts` — Configuration array `PACKAGING_FORMATS` that maps
the user-facing label + accessible `alt` descriptions to the `art`
components. This makes swapping to photographic images later trivial.

## How to replace with real photography later

1. Add optimized image files (WebP/AVIF/PNG) to `public/assets/...` or
  `src/assets/...`.

2. Update `PACKAGING_FORMATS` in `packagingFormats.ts` to use an `<img>` or
  a React component that renders `<picture>` with responsive `srcset`.

3. Ensure `alt` text is preserved and licenses for the photographic assets
  are recorded here.

## Licensing notes

Current SVG artwork: original and owned by MPB (or created for the project).

If you add third-party stock assets later, record the source URL, creator,
and license here (Unsplash/Pexels/Pixabay or purchased stock) before
committing.

## Notes

The hero already supports accessibility (reduced-motion) and responsive
behavior; see `PackagingShowcase.tsx` and `PackagingShowcase.css` for the
implementation details.
