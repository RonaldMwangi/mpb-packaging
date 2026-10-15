import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export default function AnimatedCounter({ value, suffix = "", duration = 1200 }: AnimatedCounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(counterRef, { once: true, amount: 0.7 });
  const reduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setDisplayValue(value);
      return;
    }

    let frame = 0;
    const startedAt = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [duration, inView, reduceMotion, value]);

  return <span ref={counterRef}>{displayValue}{suffix}</span>;
}
