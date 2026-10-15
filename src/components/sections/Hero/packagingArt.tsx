/* ==========================================================================
   MPB PACKAGING — HERO PACKAGING ART
   --------------------------------------------------------------------------
   Seven flexible-packaging formats drawn as original SVG product renders.

   Why SVG rather than photography:
     - Completely original, so there is no licensing question and no chance
       of a real-world brand appearing on a pack.
     - Colours come from the MPB brand palette only.
     - A few KB each instead of megabytes, and crisp on any screen.
     - One consistent lighting setup across all seven, so the sequence
       reads as a curated set rather than assorted stock images.

   Every pack is drawn on the same 400 x 520 canvas. Keeping the canvas
   identical is what lets one format cross-dissolve into the next without
   the composition jumping.

   To swap in real photography later, replace the `art` field in the
   PACKAGING_FORMATS array below with an <img> and nothing else changes.
   ========================================================================== */

/* --------------------------------------------------------------------------
   Shared gradients and filters.
   Rendered once, referenced by every pack.
   -------------------------------------------------------------------------- */

function PackDefs() {
  return (
    <defs>
      {/* Navy film body — lit from the upper left */}
      <linearGradient id="mpbBody" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4548B4" />
        <stop offset="42%" stopColor="#2E3192" />
        <stop offset="100%" stopColor="#1E2168" />
      </linearGradient>

      {/* Deep navy body, used for contrast between consecutive packs */}
      <linearGradient id="mpbBodyDeep" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#0A4A8F" />
        <stop offset="45%" stopColor="#012B64" />
        <stop offset="100%" stopColor="#011C42" />
      </linearGradient>

      {/* Light film body for bread and roll stock */}
      <linearGradient id="mpbBodyLight" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="55%" stopColor="#EEF2F8" />
        <stop offset="100%" stopColor="#D7DEEA" />
      </linearGradient>

      {/* Cyan accent band */}
      <linearGradient id="mpbCyan" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#28AAE1" />
        <stop offset="100%" stopColor="#0C74A8" />
      </linearGradient>

      {/* Specular sheen — the diagonal gloss that reads as plastic film */}
      <linearGradient id="mpbSheen" x1="0" y1="0" x2="0.9" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
        <stop offset="38%" stopColor="#FFFFFF" stopOpacity="0.3" />
        <stop offset="52%" stopColor="#FFFFFF" stopOpacity="0.06" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>

      {/* Edge darkening, gives the pack volume */}
      <linearGradient id="mpbEdge" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#000000" stopOpacity="0.22" />
        <stop offset="14%" stopColor="#000000" stopOpacity="0" />
        <stop offset="86%" stopColor="#000000" stopOpacity="0" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0.26" />
      </linearGradient>

      {/* Soft contact shadow on the floor */}
      <radialGradient id="mpbShadow" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="#012B64" stopOpacity="0.3" />
        <stop offset="65%" stopColor="#012B64" stopOpacity="0.09" />
        <stop offset="100%" stopColor="#012B64" stopOpacity="0" />
      </radialGradient>

      {/* Crimp/seal texture for sealed edges */}
      <pattern
        id="mpbCrimp"
        width="7"
        height="8"
        patternUnits="userSpaceOnUse"
      >
        <rect width="7" height="8" fill="#FFFFFF" fillOpacity="0.07" />
        <rect width="2.6" height="8" fill="#000000" fillOpacity="0.16" />
      </pattern>
    </defs>
  );
}

/* Soft elliptical shadow under every pack. */
function Shadow({ cx = 200, cy = 470, rx = 118, ry = 20 }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="url(#mpbShadow)" />;
}

/* --------------------------------------------------------------------------
   1. STAND-UP POUCH  (doypack — tapered body, rounded top, bottom gusset)
   -------------------------------------------------------------------------- */

export function StandUpPouch() {
  return (
    <g>
      <Shadow rx={104} />

      {/* Body */}
      <path
        d="M132 108 Q200 96 268 108 L282 424 Q200 440 118 424 Z"
        fill="url(#mpbBody)"
      />

      {/* Bottom gusset — the fold that lets the pouch stand. Lighter than
          the body so the fold reads clearly as a separate plane. */}
      <path
        d="M118 424 Q200 442 282 424 L272 456 Q200 472 128 456 Z"
        fill="#3A3DA5"
      />
      {/* Centre fold plus the two side creases of the gusset */}
      <path
        d="M200 442 L200 470"
        stroke="#0F1233"
        strokeOpacity="0.45"
        strokeWidth="1.8"
      />
      <path
        d="M156 435 L162 464 M244 435 L238 464"
        stroke="#0F1233"
        strokeOpacity="0.28"
        strokeWidth="1.5"
      />
      <path
        d="M118 424 Q200 442 282 424"
        stroke="#000000"
        strokeOpacity="0.3"
        strokeWidth="2"
        fill="none"
      />

      {/* Top seal */}
      <path
        d="M132 108 Q200 96 268 108 L266 84 Q200 72 134 84 Z"
        fill="#161942"
      />
      <rect x="134" y="76" width="132" height="9" fill="url(#mpbCrimp)" />

      {/* Cyan brand band */}
      <path
        d="M124 250 Q200 262 276 250 L277 282 Q200 294 123 282 Z"
        fill="url(#mpbCyan)"
        opacity="0.95"
      />

      {/* Abstract generic mark — deliberately not a real logo */}
      <circle cx="200" cy="196" r="26" fill="#FFFFFF" fillOpacity="0.14" />
      <path
        d="M188 204 L200 178 L212 204 Z"
        fill="#FFFFFF"
        fillOpacity="0.55"
      />
      <rect
        x="168"
        y="330"
        width="64"
        height="5"
        rx="2.5"
        fill="#FFFFFF"
        fillOpacity="0.3"
      />
      <rect
        x="180"
        y="344"
        width="40"
        height="5"
        rx="2.5"
        fill="#FFFFFF"
        fillOpacity="0.18"
      />

      {/* Folds, sheen, edges */}
      <path
        d="M162 112 Q158 268 166 420"
        stroke="#FFFFFF"
        strokeOpacity="0.13"
        strokeWidth="2.5"
        fill="none"
      />
      <path
        d="M240 112 Q246 268 238 420"
        stroke="#000000"
        strokeOpacity="0.14"
        strokeWidth="3"
        fill="none"
      />
      <path
        d="M132 108 Q200 96 268 108 L282 424 Q200 440 118 424 Z"
        fill="url(#mpbSheen)"
      />
      <path
        d="M132 108 Q200 96 268 108 L282 424 Q200 440 118 424 Z"
        fill="url(#mpbEdge)"
      />
    </g>
  );
}

/* --------------------------------------------------------------------------
   2. GUSSET POUCH  (side-gusset bag — squarer, visible side folds)
   -------------------------------------------------------------------------- */

export function GussetPouch() {
  return (
    <g>
      <Shadow rx={110} />

      {/* Side gusset panel, set back */}
      <path d="M104 118 L138 100 L138 442 L104 452 Z" fill="#181B4E" />

      {/* Front face */}
      <path d="M138 100 L286 100 L286 442 L138 442 Z" fill="url(#mpbBody)" />

      {/* Right gusset edge catching light */}
      <path d="M286 100 L300 116 L300 448 L286 442 Z" fill="#252A7C" />

      {/* Top seal across the whole width. The crimp follows the angled seal
          rather than sitting on a flat rectangle. */}
      <path d="M104 118 L138 100 L286 100 L300 116 L300 92 L138 76 L104 94 Z" fill="#141737" />
      <path
        d="M104 94 L138 76 L286 76 L300 92 L300 100 L286 84 L138 84 L104 102 Z"
        fill="url(#mpbCrimp)"
      />

      {/* Bottom seal */}
      <rect x="138" y="428" width="148" height="14" fill="#101334" />

      {/* Cyan band */}
      <rect x="138" y="236" width="148" height="34" fill="url(#mpbCyan)" />
      <rect x="286" y="236" width="14" height="34" fill="#0C74A8" />

      {/* Generic artwork */}
      <rect
        x="160"
        y="150"
        width="58"
        height="6"
        rx="3"
        fill="#FFFFFF"
        fillOpacity="0.34"
      />
      <rect
        x="160"
        y="166"
        width="96"
        height="6"
        rx="3"
        fill="#FFFFFF"
        fillOpacity="0.18"
      />
      <circle cx="252" cy="196" r="20" fill="#FFFFFF" fillOpacity="0.12" />
      <rect
        x="160"
        y="320"
        width="72"
        height="5"
        rx="2.5"
        fill="#FFFFFF"
        fillOpacity="0.22"
      />

      {/* Gusset crease + sheen */}
      <path
        d="M138 100 L138 442"
        stroke="#000000"
        strokeOpacity="0.3"
        strokeWidth="2"
      />
      <path
        d="M286 100 L286 442"
        stroke="#FFFFFF"
        strokeOpacity="0.14"
        strokeWidth="2"
      />
      <path d="M138 100 L286 100 L286 442 L138 442 Z" fill="url(#mpbSheen)" />
      <path d="M138 100 L300 116 L300 448 L138 442 Z" fill="url(#mpbEdge)" />
    </g>
  );
}

/* --------------------------------------------------------------------------
   3. PILLOW POUCH  (horizontal fin-seal pack, crimped both ends)
   -------------------------------------------------------------------------- */

export function PillowPouch() {
  return (
    <g>
      <Shadow cy={438} rx={126} ry={18} />

      {/* Body — bowed top and bottom, which is what makes it read "pillow" */}
      <path
        d="M96 214 Q200 178 304 214 Q316 300 304 386 Q200 422 96 386 Q84 300 96 214 Z"
        fill="url(#mpbBodyDeep)"
      />

      {/* Crimped end seals */}
      <path d="M96 214 Q84 300 96 386 L66 396 Q56 300 66 204 Z" fill="#01203F" />
      <rect x="60" y="212" width="10" height="176" fill="url(#mpbCrimp)" />

      <path
        d="M304 214 Q316 300 304 386 L334 396 Q344 300 334 204 Z"
        fill="#01203F"
      />
      <rect x="330" y="212" width="10" height="176" fill="url(#mpbCrimp)" />

      {/* Cyan band running the length */}
      <path
        d="M96 268 Q200 234 304 268 L304 302 Q200 268 96 302 Z"
        fill="url(#mpbCyan)"
        opacity="0.9"
      />

      {/* Generic artwork */}
      <rect
        x="150"
        y="330"
        width="100"
        height="6"
        rx="3"
        fill="#FFFFFF"
        fillOpacity="0.3"
      />
      <rect
        x="170"
        y="346"
        width="60"
        height="6"
        rx="3"
        fill="#FFFFFF"
        fillOpacity="0.16"
      />
      <circle cx="200" cy="230" r="14" fill="#FFFFFF" fillOpacity="0.16" />

      {/* Longitudinal fin seal + sheen */}
      <path
        d="M96 300 Q200 264 304 300"
        stroke="#FFFFFF"
        strokeOpacity="0.1"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M96 214 Q200 178 304 214 Q316 300 304 386 Q200 422 96 386 Q84 300 96 214 Z"
        fill="url(#mpbSheen)"
      />
    </g>
  );
}

/* --------------------------------------------------------------------------
   4. BREAD PACKAGING  (bread bag, gathered and clipped at the neck)
   -------------------------------------------------------------------------- */

export function BreadBag() {
  return (
    <g>
      <Shadow rx={112} />

      {/* Bag body — light, semi-transparent film */}
      <path
        d="M112 176 Q200 158 288 176 L296 430 Q200 448 104 430 Z"
        fill="url(#mpbBodyLight)"
      />

      {/* Loaf visible through the film */}
      <path
        d="M132 250 Q200 218 268 250 L268 408 Q200 424 132 408 Z"
        fill="#C9A87C"
        fillOpacity="0.55"
      />
      <path
        d="M132 250 Q200 218 268 250 L268 268 Q200 240 132 268 Z"
        fill="#B08E5F"
        fillOpacity="0.5"
      />
      {/* Slice lines */}
      {[290, 322, 354, 386].map((y) => (
        <path
          key={y}
          d={`M136 ${y} Q200 ${y - 8} 264 ${y}`}
          stroke="#8E6E45"
          strokeOpacity="0.28"
          strokeWidth="1.6"
          fill="none"
        />
      ))}

      {/* Gathered neck */}
      <path
        d="M112 176 Q200 158 288 176 L262 128 Q200 112 138 128 Z"
        fill="#E3E9F2"
      />
      <path
        d="M160 130 L176 174 M200 116 L200 168 M240 130 L226 174"
        stroke="#9AA6BA"
        strokeOpacity="0.55"
        strokeWidth="2"
        fill="none"
      />

      {/* Bag clip in brand navy */}
      <rect x="176" y="104" width="48" height="18" rx="3" fill="#2E3192" />
      <rect x="194" y="109" width="12" height="8" rx="1.5" fill="#FFFFFF" fillOpacity="0.5" />

      {/* Cyan print band */}
      <path
        d="M104 300 Q200 282 296 300 L296 330 Q200 312 104 330 Z"
        fill="url(#mpbCyan)"
        opacity="0.88"
      />
      <rect
        x="164"
        y="196"
        width="72"
        height="6"
        rx="3"
        fill="#2E3192"
        fillOpacity="0.4"
      />
      <rect
        x="178"
        y="212"
        width="44"
        height="5"
        rx="2.5"
        fill="#2E3192"
        fillOpacity="0.22"
      />

      {/* Film sheen */}
      <path
        d="M112 176 Q200 158 288 176 L296 430 Q200 448 104 430 Z"
        fill="url(#mpbSheen)"
      />
      <path
        d="M112 176 Q200 158 288 176 L296 430 Q200 448 104 430 Z"
        fill="url(#mpbEdge)"
      />
    </g>
  );
}

/* --------------------------------------------------------------------------
   5. SLEEVES  (shrink sleeve conforming to a cylindrical container)
   -------------------------------------------------------------------------- */

export function ShrinkSleeve() {
  return (
    <g>
      <Shadow rx={92} />

      {/* Container silhouette */}
      <path
        d="M150 150 Q200 138 250 150 L258 424 Q200 442 142 424 Z"
        fill="url(#mpbBodyDeep)"
      />

      {/* Neck and cap */}
      <path d="M178 150 L178 108 Q200 100 222 108 L222 150 Z" fill="#012B64" />
      <rect x="172" y="88" width="56" height="22" rx="4" fill="#28AAE1" />
      <rect
        x="176"
        y="93"
        width="48"
        height="5"
        rx="2.5"
        fill="#FFFFFF"
        fillOpacity="0.35"
      />

      {/* The sleeve itself — a wrap with visible top and bottom edges */}
      <path
        d="M144 210 Q200 196 256 210 L257 366 Q200 380 143 366 Z"
        fill="url(#mpbBody)"
      />
      <path
        d="M144 210 Q200 196 256 210"
        stroke="#FFFFFF"
        strokeOpacity="0.3"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M143 366 Q200 380 257 366"
        stroke="#000000"
        strokeOpacity="0.22"
        strokeWidth="2"
        fill="none"
      />

      {/* Sleeve artwork */}
      <path
        d="M143 268 Q200 254 257 268 L257 296 Q200 282 143 296 Z"
        fill="url(#mpbCyan)"
      />
      <rect
        x="168"
        y="230"
        width="64"
        height="6"
        rx="3"
        fill="#FFFFFF"
        fillOpacity="0.34"
      />
      <rect
        x="180"
        y="322"
        width="40"
        height="5"
        rx="2.5"
        fill="#FFFFFF"
        fillOpacity="0.2"
      />

      {/* Cylindrical shading — the vertical highlight that sells the curve */}
      <path
        d="M168 152 Q164 290 172 424"
        stroke="#FFFFFF"
        strokeOpacity="0.16"
        strokeWidth="8"
        fill="none"
      />
      <path
        d="M150 150 Q200 138 250 150 L258 424 Q200 442 142 424 Z"
        fill="url(#mpbEdge)"
      />
      <path
        d="M150 150 Q200 138 250 150 L258 424 Q200 442 142 424 Z"
        fill="url(#mpbSheen)"
      />
    </g>
  );
}

/* --------------------------------------------------------------------------
   6. ROLL STOCK  (printed film roll with the web unfurling)
   -------------------------------------------------------------------------- */

export function RollStock() {
  return (
    <g>
      <Shadow cy={468} rx={136} ry={18} />

      {/* ---- The web: a wide sheet of film leaving the roll and travelling
              away from the viewer, down and to the left. Its width matches
              the length of the reel, which is what makes it read as roll
              stock rather than a ribbon. ---- */}
      <path
        d="M134 300 L300 300 C298 350 274 398 234 438
           C176 452 112 450 60 434 C80 386 106 342 134 300 Z"
        fill="url(#mpbBody)"
      />

      {/* Repeat print running down the web */}
      <path
        d="M168 306 C160 352 142 396 116 432"
        stroke="url(#mpbCyan)"
        strokeWidth="16"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />
      <path
        d="M246 304 C242 350 226 394 202 430"
        stroke="#FFFFFF"
        strokeOpacity="0.14"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />

      {/* Creases along the direction of travel */}
      <path
        d="M198 302 C192 350 176 396 152 434"
        stroke="#FFFFFF"
        strokeOpacity="0.13"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M276 302 C272 348 256 392 234 428"
        stroke="#000000"
        strokeOpacity="0.14"
        strokeWidth="1.5"
        fill="none"
      />

      {/* ---- The reel: a horizontal cylinder. The far end sits behind,
              the near end shows the wound film and the core. ---- */}

      {/* Far end, darker so the cylinder has depth */}
      <ellipse cx="134" cy="216" rx="34" ry="86" fill="#011C42" />

      {/* Cylinder body */}
      <path d="M134 130 L300 130 L300 302 L134 302 Z" fill="url(#mpbBodyDeep)" />

      {/* Wound film edge along the top of the reel */}
      <path
        d="M134 130 L300 130"
        stroke="#FFFFFF"
        strokeOpacity="0.22"
        strokeWidth="2.5"
      />

      {/* Near end face */}
      <ellipse cx="300" cy="216" rx="34" ry="86" fill="#012B64" />
      <ellipse
        cx="300"
        cy="216"
        rx="34"
        ry="86"
        fill="none"
        stroke="#011C42"
        strokeWidth="2"
      />

      {/* Concentric windings on the face */}
      {[[27, 68], [20, 50], [13, 32]].map(([rx, ry]) => (
        <ellipse
          key={rx}
          cx="300"
          cy="216"
          rx={rx}
          ry={ry}
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity="0.1"
          strokeWidth="1.4"
        />
      ))}

      {/* Core */}
      <ellipse cx="300" cy="216" rx="9" ry="22" fill="#E3E9F2" />
      <ellipse cx="300" cy="216" rx="4.5" ry="11" fill="#A9B4C6" />

      {/* Cyan band printed around the circumference */}
      <path d="M134 190 L300 190 L300 218 L134 218 Z" fill="url(#mpbCyan)" />
      <ellipse
        cx="300"
        cy="204"
        rx="34"
        ry="14"
        fill="#0C74A8"
        opacity="0.55"
      />

      {/* Specular highlight along the length of the cylinder */}
      <path
        d="M134 152 L300 152"
        stroke="#FFFFFF"
        strokeOpacity="0.2"
        strokeWidth="12"
        strokeLinecap="round"
      />

      <path d="M134 130 L300 130 L300 302 L134 302 Z" fill="url(#mpbSheen)" />
    </g>
  );
}

/* --------------------------------------------------------------------------
   7. FLEXIBLE BREAD PACKAGING  (flow-wrapped loaf, sealed both ends)
   -------------------------------------------------------------------------- */

export function FlowWrapBread() {
  return (
    <g>
      <Shadow cy={430} rx={130} ry={18} />

      {/* Flow-wrap body */}
      <path
        d="M92 208 Q200 176 308 208 Q320 296 308 384 Q200 416 92 384 Q80 296 92 208 Z"
        fill="url(#mpbBodyLight)"
      />

      {/* Loaf inside, seen through the film */}
      <path
        d="M124 240 Q200 212 276 240 Q284 300 276 356 Q200 384 124 356 Q116 300 124 240 Z"
        fill="#C9A87C"
        fillOpacity="0.5"
      />
      <path
        d="M124 240 Q200 212 276 240 Q278 258 276 268 Q200 240 124 268 Z"
        fill="#AE8B5C"
        fillOpacity="0.45"
      />

      {/* End seals, gathered and crimped */}
      <path d="M92 208 Q80 296 92 384 L62 392 Q52 296 62 200 Z" fill="#CBD4E2" />
      <rect x="56" y="206" width="10" height="180" fill="url(#mpbCrimp)" />
      <path
        d="M308 208 Q320 296 308 384 L338 392 Q348 296 338 200 Z"
        fill="#CBD4E2"
      />
      <rect x="334" y="206" width="10" height="180" fill="url(#mpbCrimp)" />

      {/* Printed cyan band */}
      <path
        d="M92 272 Q200 240 308 272 L308 306 Q200 274 92 306 Z"
        fill="url(#mpbCyan)"
        opacity="0.9"
      />
      <rect
        x="152"
        y="330"
        width="96"
        height="6"
        rx="3"
        fill="#2E3192"
        fillOpacity="0.4"
      />
      <rect
        x="172"
        y="346"
        width="56"
        height="5"
        rx="2.5"
        fill="#2E3192"
        fillOpacity="0.22"
      />

      {/* Film gloss */}
      <path
        d="M92 208 Q200 176 308 208 Q320 296 308 384 Q200 416 92 384 Q80 296 92 208 Z"
        fill="url(#mpbSheen)"
      />
      <path
        d="M92 208 Q200 176 308 208 Q320 296 308 384 Q200 416 92 384 Q80 296 92 208 Z"
        fill="url(#mpbEdge)"
      />
    </g>
  );
}


/* --------------------------------------------------------------------------
   CANVAS
   --------------------------------------------------------------------------
   Renders one packaging format on the shared 400 x 520 canvas. Keeping the
   canvas identical for every format is what lets one pack cross-dissolve
   into the next without the composition jumping.
   -------------------------------------------------------------------------- */

export function PackagingArt({
  art: Art,
  alt,
}: {
  art: () => React.ReactElement;
  alt: string;
}) {
  return (
    <svg
      className="pack-svg"
      viewBox="0 0 400 520"
      role="img"
      aria-label={alt}
      preserveAspectRatio="xMidYMid meet"
    >
      <PackDefs />
      <Art />
    </svg>
  );
}
