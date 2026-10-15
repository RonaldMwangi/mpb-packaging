import "./ProductCarousel.css";
import "./BackgroundEffects.css";
import "./PackagingShowcase.css";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import {
  useCallback, useEffect, useRef, useState,
  type CSSProperties, type KeyboardEvent, type ReactNode,
} from "react";
import { heroSlides } from "../../../data/heroSlides";

const SLIDE_DURATION = 2500;
const TRANSITION_DURATION = 600;
const EASE = [0.16, 1, 0.3, 1] as const;
const wrap = (index: number) => (index + heroSlides.length) % heroSlides.length;

function imageSource(index: number) {
  return heroSlides[index].image;
}

export default function ProductCarousel({ children }: { children: ReactNode }) {
  const [slide, setSlide] = useState({ current: 0, direction: 1 });
  const { current, direction } = slide;
  const [paused, setPaused] = useState(false);
  const [touching, setTouching] = useState(false);
  const [visible, setVisible] = useState(true);
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const region = useRef<HTMLDivElement>(null);
  const requested = useRef(0);
  const requestId = useRef(0);
  const timer = useRef<number | undefined>(undefined);
  const pending = useRef(false);
  const transitionEnds = useRef(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const reduceMotion = useReducedMotion();
  const active = heroSlides[current];
  const playing = !paused && !touching && visible && inView && ready && !failed;

  const select = useCallback(async (index: number, travel: number) => {
    // Serialize decoding and transitions so rapid input cannot skip artworks.
    if (pending.current || performance.now() < transitionEnds.current) return;
    window.clearTimeout(timer.current);
    pending.current = true;
    const next = wrap(index);
    const token = ++requestId.current;
    const image = new Image();
    image.src = imageSource(next);
    try {
      // Keep the current artwork visible until its replacement can be painted.
      await image.decode();
      if (token !== requestId.current) return;
      transitionEnds.current = performance.now() + (reduceMotion || next === requested.current ? 0 : TRANSITION_DURATION);
      requested.current = next;
      setFailed(false);
      setSlide({ current: next, direction: travel });
    } catch {
      if (token === requestId.current) setFailed(true);
    } finally {
      if (token === requestId.current) pending.current = false;
    }
  }, [reduceMotion]);

  const step = useCallback((travel: number) => {
    void select(requested.current + travel, travel);
  }, [select]);

  useEffect(() => {
    if (!playing) return;
    // One timeout per committed slide; manual selection starts a fresh interval.
    timer.current = window.setTimeout(() => step(1), SLIDE_DURATION);
    return () => window.clearTimeout(timer.current);
  }, [slide, playing, step]);

  useEffect(() => {
    if (!ready || !inView) return;
    // Warm just the next artwork after the first image has loaded.
    const image = new Image();
    image.fetchPriority = "low";
    image.src = imageSource(wrap(current + 1));
  }, [current, inView, ready]);

  useEffect(() => {
    const visibility = () => setVisible(!document.hidden);
    visibility();
    document.addEventListener("visibilitychange", visibility);
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, { threshold: 0.15 });
    if (region.current) observer.observe(region.current);
    return () => {
      document.removeEventListener("visibilitychange", visibility);
      observer.disconnect();
      requestId.current += 1;
    };
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      step(event.key === "ArrowRight" ? 1 : -1);
    }
  };

  return (
    <div
      className="hero-gallery"
      data-theme={active.theme}
      data-drifting={!reduceMotion && !paused && visible && inView && ready}
      ref={region}
      role="region"
      aria-roledescription="carousel"
      aria-label="MPB flexible packaging showcase"
      onKeyDown={handleKeyDown}
      onTouchStart={(event) => {
        setTouching(true);
        const touch = event.touches[0];
        touchStart.current = { x: touch.clientX, y: touch.clientY };
      }}
      onTouchEnd={(event) => {
        const start = touchStart.current;
        const end = event.changedTouches[0];
        if (start && !(event.target as HTMLElement).closest("a, button")) {
          const dx = end.clientX - start.x;
          const dy = end.clientY - start.y;
          if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1);
        }
        touchStart.current = null;
        setTouching(false);
      }}
      onTouchCancel={() => { touchStart.current = null; setTouching(false); }}
    >
      <div className="hero-background" aria-hidden="true">
        <div className="bg-grid" />
        <div className="bg-grid bg-grid-dark" />
      </div>
      <div className="hero-artwork" aria-hidden="true">
        <div className="showcase-bloom" />
        <AnimatePresence mode="sync" initial={false} custom={direction}>
          <motion.div
            className="hero-artwork-slide"
            key={active.id}
            custom={direction}
            variants={{
              enter: (travel: number) => ({ opacity: 0, x: reduceMotion ? 0 : travel * 45, scale: reduceMotion ? 1 : 1.03, filter: reduceMotion ? "blur(0px)" : "blur(6px)" }),
              visible: { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" },
              exit: (travel: number) => ({
                opacity: 0, x: reduceMotion ? 0 : travel * -45, scale: reduceMotion ? 1 : 0.97,
                filter: reduceMotion ? "blur(0px)" : "blur(2px)",
                transition: {
                  type: "tween", duration: reduceMotion ? 0 : TRANSITION_DURATION / 1000, ease: EASE,
                  filter: { type: "tween", delay: reduceMotion ? 0 : TRANSITION_DURATION * 0.7 / 1000, duration: reduceMotion ? 0 : TRANSITION_DURATION * 0.3 / 1000, ease: EASE },
                },
              }),
            }}
            initial="enter"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: reduceMotion ? 0 : TRANSITION_DURATION / 1000, ease: EASE }}
            style={{
              "--artwork-size": active.size,
              "--artwork-dwell": `${SLIDE_DURATION}ms`,
            } as CSSProperties}
          >
            <picture className="hero-product-float">
              <img
                src={active.image}
                alt=""
                width={active.width}
                height={active.height}
                decoding="async"
                fetchPriority={current === 0 ? "high" : "low"}
                loading="eager"
                draggable={false}
                onLoad={() => setReady(true)}
                onError={() => { setReady(true); setFailed(true); }}
              />
            </picture>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="hero-artwork-overlay" aria-hidden="true" />
      <div className="hero-gallery-footer">
        <div className="hero-gallery-controls" aria-label="Artwork controls">
          <button type="button" onClick={() => step(-1)} aria-label="Previous artwork">
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <div className="hero-gallery-progress" aria-label="Choose artwork">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Show artwork ${index + 1}: ${slide.title}`}
                aria-current={index === current ? "true" : undefined}
                onClick={() => void select(index, index >= current ? 1 : -1)}
              ><span /></button>
            ))}
          </div>
          <button type="button" onClick={() => step(1)} aria-label="Next artwork">
            <ArrowRight size={18} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => {
              window.clearTimeout(timer.current);
              requestId.current += 1;
              pending.current = false;
              setPaused(value => !value);
            }}
              aria-label={paused ? "Resume autoplay" : "Pause autoplay"} aria-pressed={paused}>
              {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
          </button>
        </div>
        <span className="hero-gallery-count" aria-hidden="true">
          <AnimatePresence mode="sync" initial={false} custom={direction}>
            <motion.span key={active.id} custom={direction}
              variants={{
                enter: (travel: number) => ({ opacity: 0, x: reduceMotion ? 0 : travel * 8 }),
                visible: { opacity: 1, x: 0 },
                exit: (travel: number) => ({ opacity: 0, x: reduceMotion ? 0 : travel * -8 }),
              }}
              initial="enter" animate="visible" exit="exit"
              transition={{ type: "tween", duration: reduceMotion ? 0 : 0.35, ease: EASE }}>
              {String(current + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </span>
      </div>
      {children}
      <span className="visually-hidden" aria-live={playing ? "off" : "polite"} aria-atomic="true">
        {failed ? "Artwork unavailable. Please choose another slide." : `Artwork ${current + 1} of ${heroSlides.length}: ${active.alt}`}
      </span>
    </div>
  );
}
