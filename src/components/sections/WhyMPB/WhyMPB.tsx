import "./WhyMPB.css";

import SectionHeading from "../../common/SectionHeading";
import FeatureCard from "../../common/FeatureCard";

import { features } from "../../../data/whyMpb";
import SectionMotif from "../../common/SectionMotif";
import { motion } from "framer-motion";
import { revealViewport, siteFadeLeft, siteStaggerContainer } from "../../../utils/animations";
import AnimatedCounter from "../../common/AnimatedCounter";

export default function WhyMPB() {
  return (
    <section className="why print-motif-section" id="why-mpb">
      <SectionMotif variant="halftone" />
      <div className="container">
        <SectionHeading
          eyebrow="WHY LEADING BRANDS TRUST MPB"
          title="Packaging Expertise That Delivers Results"
          description="Every packaging solution is backed by advanced manufacturing, technical expertise and a commitment to consistent quality."
        />

        <motion.div className="stats" variants={siteStaggerContainer} initial="hidden" whileInView="visible" viewport={revealViewport}>
          <motion.div variants={siteFadeLeft}>
            <h2><AnimatedCounter value={25} suffix="+" /></h2>

            <p>Years Experience</p>
          </motion.div>

          <motion.div variants={siteFadeLeft}>
            <h2><AnimatedCounter value={300} suffix="+" /></h2>

            <p>Packaging Projects</p>
          </motion.div>

          <motion.div variants={siteFadeLeft}>
            <h2><AnimatedCounter value={100} suffix="%" /></h2>

            <p>Quality Inspection</p>
          </motion.div>

        </motion.div>

        <motion.div className="features-grid" variants={siteStaggerContainer} initial="hidden" whileInView="visible" viewport={revealViewport}>
          {features.map((feature) => (
            <motion.div key={feature.id} variants={siteFadeLeft}>
              <FeatureCard title={feature.title} description={feature.description} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
