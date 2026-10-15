import "./Process.css";

import SectionHeading from "../../common/SectionHeading";
import SectionMotif from "../../common/SectionMotif";
import { motion } from "framer-motion";
import { revealViewport, siteFadeLeft, siteStaggerContainer } from "../../../utils/animations";

import { processSteps } from "../../../data/process";

export default function Process() {
  return (
    <section className="process print-motif-section" id="process">
      <SectionMotif variant="dieline" />
      <div className="container">
        <SectionHeading
          eyebrow="OUR PROCESS"
          title="From Concept to Finished Packaging"
          description="Every project follows a structured process to ensure quality, efficiency and consistency."
        />

        <motion.ol
          className="process-timeline"
          variants={siteStaggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          {processSteps.map((step) => (
            <motion.li className="process-step" key={step.id} variants={siteFadeLeft}>
              <div className="process-node" aria-hidden="true">
                <span>{step.number}</span>
              </div>
              <div className="process-step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
