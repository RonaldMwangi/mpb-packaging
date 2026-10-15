import "./Manufacturing.css";
import SectionHeading from "../../common/SectionHeading";
import SectionMotif from "../../common/SectionMotif";
import { motion } from "framer-motion";
import {
  revealViewport,
  siteFadeLeft,
  siteFadeRight,
  siteStaggerContainer,
} from "../../../utils/animations";
import { ArrowRight } from "lucide-react";
import facilityImage from "../../../assets/Images/Capabilities/Worker Inspecting Snack Packaging Line.png";

export default function Manufacturing() {
  return (
    <section className="manufacturing print-motif-section" id="manufacturing">
      <SectionMotif variant="web" />
      <div className="container manufacturing-grid">
        <motion.div
          className="manufacturing-image"
          variants={siteFadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          <img
            src={facilityImage}
            alt="Worker inspecting printed snack packaging film on the production line"
            width={1184}
            height={1328}
            loading="lazy"
            decoding="async"
          />
        </motion.div>

        <motion.div
          className="manufacturing-content"
          variants={siteFadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          <SectionHeading
            eyebrow="OUR CAPABILITIES"
            title="Built for Quality. Designed for Scale."
            description="Our investment in modern technology, production capabilities and creative services enables us to deliver packaging that best suits your needs."
            center={false}
          />

          <motion.div className="features" variants={siteStaggerContainer}>
            <motion.div className="feature" variants={siteFadeLeft}>
              <h4>Pre-press & Graphic Design</h4>

              <p>
                Professional packaging design, artwork setup and technical file
                preparation.
              </p>
            </motion.div>

            <motion.div className="feature" variants={siteFadeLeft}>
              <h4>Rotogravure Printing</h4>

              <p>
                High-definition multi-colour printing for sharp, consistent
                packaging graphics.
              </p>
            </motion.div>

            <motion.div className="feature" variants={siteFadeLeft}>
              <h4>Flexographic Printing</h4>

              <p>
                Clean, efficient printing for bold graphics, solid colours and
                consistent results.
              </p>
            </motion.div>

            <motion.div className="feature" variants={siteFadeLeft}>
              <h4>Pouch & Bag Making</h4>

              <p>
                Flexible films converted into finished pouches, bags and custom
                packaging formats.
              </p>
            </motion.div>
          </motion.div>
          <motion.a
            className="btn-primary manufacturing-cta"
            href="#contact"
            variants={siteFadeLeft}
          >
            Talk to Our Team
            <ArrowRight size={18} aria-hidden="true" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
