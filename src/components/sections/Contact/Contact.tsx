import "./Contact.css";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Mail } from "lucide-react";

import {
  revealViewport,
  siteFadeLeft,
  siteFadeRight,
  siteStaggerContainer,
} from "../../../utils/animations";
import SectionMotif from "../../common/SectionMotif";
import { contact } from "../../../data/contact";

export default function Contact() {
  return (
    <section className="contact print-motif-section" id="contact">
      <SectionMotif variant="registration" />
      <div className="container contact-wrapper">
        {/* LEFT */}

        <motion.div
          className="contact-content"
          variants={siteStaggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          <motion.span className="eyebrow eyebrow-on-dark" variants={siteFadeLeft}>
            START A CONVERSATION
          </motion.span>

          <motion.h2 variants={siteFadeLeft}>
            Let's Build Packaging That Moves Your Brand Forward.
          </motion.h2>

          <motion.p className="contact-text" variants={siteFadeLeft}>
            We're ready to help you find the right flexible packaging solution.
          </motion.p>

          <motion.div className="contact-buttons" variants={siteFadeLeft}>
            <a className="btn-on-dark btn-lg" href={`${contact.emailHref}?subject=Packaging%20quote%20request`}>
              Request a Quote
              <ArrowRight size={18} />
            </a>

            <a className="btn-outline-on-dark btn-lg" href={contact.phones[0].href}>Speak With Our Team</a>
          </motion.div>
        </motion.div>

        {/* RIGHT */}

        <motion.div
          className="contact-direct"
          variants={siteFadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          <div className="contact-item">
            <Phone size={22} />

            <div>
              <span>Telephone</span>
              <a href={contact.phones[0].href}>{contact.phones[0].label}</a>
            </div>
          </div>

          <div className="contact-item">
            <Mail size={22} />

            <div>
              <span>Email</span>
              <a href={contact.emailHref}>{contact.email}</a>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
