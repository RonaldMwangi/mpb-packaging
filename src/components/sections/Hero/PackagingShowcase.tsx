import "./PackagingShowcase.css";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

import { PackagingArt } from "./packagingArt";
import { PACKAGING_FORMATS } from "./packagingFormats";

/** How long each format holds before handing over. */
const DWELL = 4200;

/** Expo-out easing — fast departure, long graceful settle. */
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export default function PackagingShowcase() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  /* Honours the operating system's reduced-motion setting. When enabled the
     sequence stops entirely and a single static pack is shown. */
  const reduceMotion = useReducedMotion();

  const total = PACKAGING_FORMATS.length;
  const format = PACKAGING_FORMATS[index];

  const go = useCallback(
    (next: number) => setIndex(((next % total) + total) % total),
    [total],
  );

  useEffect(() => {
    if (reduceMotion || isPaused) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, DWELL);

    return () => clearInterval(timer);
  }, [reduceMotion, isPaused, total]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") go(index + 1);
    if (event.key === "ArrowLeft") go(index - 1);
  };

  /* ------------------------------------------------------------------
     Reduced motion: one pack, no sequence, no transitions.
     ------------------------------------------------------------------ */
  if (reduceMotion) {
    return (
      <div className="showcase">
        <div className="showcase-bloom" aria-hidden="true" />

        <div className="showcase-stage">
          <div className="pack pack-current">
            <PackagingArt art={format.art} alt={format.alt} />
          </div>
        </div>

        <div className="showcase-meta">
          <p className="showcase-label">{format.label}</p>
        </div>
      </div>
    );
  }

  /* The formats sitting either side of the current one, rendered behind it
     blurred and dimmed. This is what gives the composition depth rather
     than a single pack floating on a flat background. */
  const prev = PACKAGING_FORMATS[(index - 1 + total) % total];
  const next = PACKAGING_FORMATS[(index + 1) % total];

  return (
    <div
      className="showcase"
      role="group"
      aria-roledescription="carousel"
      aria-label="MPB flexible packaging formats"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
    >
      {/* Soft light bloom behind the pack, in brand cyan at low opacity */}
      <div className="showcase-bloom" aria-hidden="true" />

      <div className="showcase-stage">
        {/* ---------- Depth layer: neighbouring formats ---------- */}
        <div className="pack-ghosts" aria-hidden="true">
          <AnimatePresence mode="wait">
            <motion.div
              key={`ghost-prev-${index}`}
              className="pack pack-ghost pack-ghost-left"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 0.16, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 1.1, ease: EASE_OUT }}
            >
              <PackagingArt art={prev.art} alt={prev.alt} />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`ghost-next-${index}`}
              className="pack pack-ghost pack-ghost-right"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 0.16, x: 0 }}
              exit={{ opacity: 0, x: 18 }}
              transition={{ duration: 1.1, ease: EASE_OUT }}
            >
              <PackagingArt art={next.art} alt={next.alt} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ---------- Hero layer: the format in focus ----------
            Blur-to-focus plus a slow cinematic scale and a whisper of
            rotation. No spinning, no bouncing, no hard cuts. */}
        <AnimatePresence mode="wait">
          <motion.div
            key={format.label}
            className="pack pack-current"
            initial={{
              opacity: 0,
              scale: 1.07,
              y: 26,
              rotate: -1.6,
              filter: "blur(12px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              rotate: 0,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: -20,
              rotate: 1.4,
              filter: "blur(9px)",
            }}
            transition={{
              duration: 1.15,
              ease: EASE_OUT,
              opacity: { duration: 0.9, ease: "linear" },
            }}
          >
            <PackagingArt art={format.art} alt={format.alt} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ---------- Category label + progress ---------- */}
      <div className="showcase-meta">
        <div className="showcase-label-slot" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.p
              key={format.label}
              className="showcase-label"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
            >
              {format.label}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="showcase-progress">
          {PACKAGING_FORMATS.map((item, i) => (
            <button
              key={item.label}
              type="button"
              className={i === index ? "seg seg-active" : "seg"}
              aria-label={`Show ${item.label}`}
              aria-current={i === index}
              onClick={() => go(i)}
            >
              {/* The active segment fills over the dwell time, so the
                  sequence reads as intentional rather than arbitrary. */}
              {i === index && (
                <motion.span
                  className="seg-fill"
                  key={`fill-${index}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isPaused ? 0.999 : 1 }}
                  transition={{
                    duration: isPaused ? 0 : DWELL / 1000,
                    ease: "linear",
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
