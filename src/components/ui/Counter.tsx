import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

interface CounterProps {
  from?: number;
  to: number;
  duration?: number;
}

export default function Counter({ from = 0, to, duration = 2 }: CounterProps) {
  const count = useMotionValue(from);

  const rounded = useTransform(count, (value) => Math.round(value));

  useEffect(() => {
    const controls = animate(count, to, {
      duration,
    });

    return () => controls.stop();
  }, [count, to, duration]);

  return <motion.span>{rounded}</motion.span>;
}
