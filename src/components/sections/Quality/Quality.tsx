import "./Quality.css";
import qualityImage from "../../../assets/Images/Quality/MPB Packaging Quality Inspection.png";
import SectionHeading from "../../common/SectionHeading";
import SectionMotif from "../../common/SectionMotif";
import { motion } from "framer-motion";
import { revealViewport, siteFadeLeft, siteFadeRight, siteStaggerContainer } from "../../../utils/animations";

export default function Quality() {
  return (
    <section className="quality print-motif-section" id="quality">
      <SectionMotif variant="registration" />
      <div className="container quality-grid">
        <motion.div className="quality-content" variants={siteFadeLeft} initial="hidden" whileInView="visible" viewport={revealViewport}>
          <SectionHeading
            eyebrow="QUALITY ASSURANCE"
            title="Quality Built Into Every Stage of Production"
            description="From material selection to final inspection, every packaging solution is produced with precision, consistency and attention to detail."
            center={false}
          />

          <motion.div className="quality-items" variants={siteStaggerContainer}>
            <motion.div className="quality-item" variants={siteFadeLeft}>
              <h4>Material Verification</h4>
              <p>
                Every production run begins with carefully selected materials
                suited to the intended application.
              </p>
            </motion.div>

            <motion.div className="quality-item" variants={siteFadeLeft}>
              <h4>Process Control</h4>
              <p>
                Printing, lamination and conversion are monitored throughout
                production for consistent quality.
              </p>
            </motion.div>

            <motion.div className="quality-item" variants={siteFadeLeft}>
              <h4>Final Inspection</h4>
              <p>
                Finished packaging is reviewed before dispatch to ensure it
                meets our production standards.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div className="quality-image" variants={siteFadeRight} initial="hidden" whileInView="visible" viewport={revealViewport}>
          <img src={qualityImage} alt="MPB quality inspector examining a printed pouch beside packaging production equipment" width={1198} height={1313} loading="lazy" decoding="async" />
        </motion.div>
      </div>
    </section>
  );
}
