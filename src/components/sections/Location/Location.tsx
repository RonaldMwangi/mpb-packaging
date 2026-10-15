import "./Location.css";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";

import {
  revealViewport,
  siteFadeLeft,
  siteFadeRight,
  siteStaggerContainer,
} from "../../../utils/animations";
import SectionMotif from "../../common/SectionMotif";
import { contact } from "../../../data/contact";

export default function Location() {
  return (
    <section className="location print-motif-section" id="location">
      <SectionMotif variant="dieline" />
      <div className="container location-content">
        <motion.div
          className="location-left"
          variants={siteStaggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          <motion.span className="eyebrow" variants={siteFadeLeft}>
            FIND US
          </motion.span>

          <motion.h2 variants={siteFadeLeft}>
            Visit Our Manufacturing Facility
          </motion.h2>

          <motion.p variants={siteFadeLeft}>
            Whether you're developing a new product or scaling production, our
            team is ready to discuss packaging solutions tailored to your
            business.
          </motion.p>

          <motion.div className="location-list" variants={siteFadeLeft}>
            <div className="location-item">
              <MapPin size={22} />
              <div>
                <h4>Address</h4>
                <p><a href={contact.directions} target="_blank" rel="noopener noreferrer">{contact.address}<br />{contact.city}</a></p>
              </div>
            </div>

            <div className="location-item">
              <Phone size={22} />
              <div>
                <h4>Phone</h4>
                {contact.phones.map(phone => <p key={phone.href}><a href={phone.href}>{phone.label}</a></p>)}
              </div>
            </div>

            <div className="location-item">
              <Mail size={22} />
              <div>
                <h4>Email</h4>
                <p><a href={contact.emailHref}>{contact.email}</a></p>
              </div>
            </div>

            <div className="location-item">
              <Clock size={22} />
              <div>
                <h4>Working Hours</h4>
                <p className="location-hours">Monday – Friday • 8:00 AM – 5:00 PM<br />Sat • 8:00 AM – 1:00 PM</p>
              </div>
            </div>
          </motion.div>

          <motion.a className="btn-primary location-directions" variants={siteFadeLeft} href={contact.directions} target="_blank" rel="noopener noreferrer">
            Get Directions
            <ArrowUpRight size={18} />
          </motion.a>
        </motion.div>

        <motion.div
          className="location-map"
          variants={siteFadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          <iframe
            title="MPB Packaging"
            src="https://www.google.com/maps?q=-4.053484,39.656998&z=16&output=embed"
            loading="lazy"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
}
