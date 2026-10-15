import "./Industries.css";

import SectionHeading from "../../common/SectionHeading";
import IndustryCard from "../../common/IndustryCard";

import { industries } from "../../../data/industries";
import SectionMotif from "../../common/SectionMotif";
import { motion } from "framer-motion";
import { revealViewport, siteFadeLeft, siteStaggerContainer } from "../../../utils/animations";

export default function Industries() {
  return (
    <section className="industries print-motif-section" id="industries">
      <SectionMotif variant="halftone" />
      <div className="container">
        <SectionHeading
          eyebrow="INDUSTRIES WE SERVE"
          title="Packaging Solutions Across Every Industry"
          description="We help manufacturers build stronger brands with flexible packaging tailored to their markets."
        />

        <motion.div
          className="industries-grid"
          variants={siteStaggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          {industries.map((industry) => (
            <motion.div key={industry.id} variants={siteFadeLeft}>
              <IndustryCard title={industry.title} image={industry.image} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
