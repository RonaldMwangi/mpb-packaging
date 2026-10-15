import "./SectionHeading.css";

import { motion } from "framer-motion";

import {
  siteFadeLeft,
  revealViewport,
  siteStaggerContainer,
} from "../../utils/animations";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  center?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  center = true,
}: SectionHeadingProps) {
  return (
    <motion.div
      className={`section-heading ${center ? "center" : "left"}`}
      variants={siteStaggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
    >
      <motion.p className="eyebrow" variants={siteFadeLeft}>
        {eyebrow}
      </motion.p>

      <motion.h2 variants={siteFadeLeft}>{title}</motion.h2>

      <motion.p className="description" variants={siteFadeLeft}>
        {description}
      </motion.p>
    </motion.div>
  );
}
