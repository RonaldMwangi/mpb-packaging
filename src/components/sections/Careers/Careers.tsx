import { TALENT_POOL_PATH } from "../../../utils/navigation";
import "./Careers.css";
import { motion } from "framer-motion";
import {
  Briefcase,
  PenTool,
  Factory,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

import {
  revealViewport,
  siteFadeLeft,
  siteStaggerContainer,
} from "../../../utils/animations";
import SectionMotif from "../../common/SectionMotif";

const careers = [
  {
    icon: Factory,
    title: "Manufacturing",
    text: "Help produce packaging trusted by leading brands across East Africa and beyond.",
  },
  {
    icon: PenTool,
    title: "Design & Prepress",
    text: "Transform ideas into production-ready packaging with precision and creativity.",
  },
  {
    icon: TrendingUp,
    title: "Sales & Business",
    text: "Partner with manufacturers to deliver packaging solutions that create real value.",
  },
  {
    icon: Briefcase,
    title: "Graduate Opportunities",
    text: "Start your career in a collaborative environment built around learning and growth.",
  },
];

export default function Careers() {
  return (
    <section className="careers print-motif-section" id="careers">
      <SectionMotif variant="web" />
      <div className="container">
        <motion.div
          className="careers-header"
          variants={siteStaggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          <motion.span className="eyebrow" variants={siteFadeLeft}>
            CAREERS
          </motion.span>

          <motion.h2 variants={siteFadeLeft}>
            Build the Future of Packaging With Us
          </motion.h2>

          <motion.p variants={siteFadeLeft}>
            Great packaging starts with great people. We are always looking for
            passionate professionals who want to solve real manufacturing
            challenges and make an impact.
          </motion.p>
        </motion.div>

        <motion.div
          className="career-grid"
          variants={siteStaggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          {careers.map((career, index) => {
            const Icon = career.icon;

            return (
              <motion.div
                key={index}
                className="career-card"
                variants={siteFadeLeft}
              >
                <div className="career-icon">
                  <Icon size={28} />
                </div>

                <h3>{career.title}</h3>

                <p>{career.text}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="career-cta"
          variants={siteFadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          <a href={TALENT_POOL_PATH} className="btn-primary btn-lg">
            Join Our Talent Pool
            <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
