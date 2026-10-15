import { homeHref } from "../../../utils/navigation";
import "./Footer.css";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import logo from "../../../assets/Images/logo.png";
import iso22000 from "../../../assets/Images/Footer/ISO 1.png";
import iso9001 from "../../../assets/Images/Footer/ISO 2.png";
import { contact } from "../../../data/contact";
import { products } from "../../../data/products";
import SocialLinks from "../../common/SocialLinks";
import {
  revealViewport,
  siteFadeLeft,
  siteStaggerContainer,
} from "../../../utils/animations";

const quickLinks = [
  ["Home", "home"],
  ["Products", "products"],
  ["Industries", "industries"],
  ["Capabilities", "manufacturing"],
  ["Quality", "quality"],
  ["Why MPB", "why-mpb"],
  ["Careers", "careers"],
  ["Location", "location"],
  ["Contact", "contact"],
];
const mobileLinkIds = new Set([
  "products",
  "industries",
  "manufacturing",
  "careers",
  "location",
  "contact",
]);

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <motion.div
          className="footer-grid"
          variants={siteStaggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          <motion.div className="footer-brand" variants={siteFadeLeft}>
            <a
              href={homeHref("#home")}
              aria-label="MPB Packaging Limited — Home"
            >
              <img
                src={logo}
                width={4500}
                height={4500}
                alt="MPB Packaging Limited"
                loading="lazy"
                decoding="async"
              />
            </a>
            <p>
              Flexible Packaging Manufacturing Company in Kenya
              <span className="footer-desktop-only">
                , supporting brands across East Africa and beyond.
              </span>
              <span className="footer-mobile-only">.</span>
            </p>
            <SocialLinks />
          </motion.div>
          <motion.nav
            className="footer-column"
            aria-label="Footer quick links"
            variants={siteFadeLeft}
          >
            <h3>Quick Links</h3>
            <ul>
              {quickLinks.map(([label, id]) => (
                <li
                  key={id}
                  className={
                    mobileLinkIds.has(id) ? undefined : "footer-desktop-only"
                  }
                >
                  <a href={homeHref(`#${id}`)}>{label}</a>
                </li>
              ))}
            </ul>
          </motion.nav>
          <motion.nav
            className="footer-column footer-solutions"
            aria-label="Packaging solutions"
            variants={siteFadeLeft}
          >
            <h3>Solutions</h3>
            <ul>
              {products.map((product) => (
                <li key={product.id}>
                  <a href={homeHref(`#product-${product.id}`)}>
                    {product.title}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
          <motion.div
            className="footer-column footer-details"
            variants={siteFadeLeft}
          >
            <h3>Contact</h3>
            <address className="footer-contact">
              <a
                href={contact.directions}
                target="_blank"
                rel="noopener noreferrer"
              >
                {contact.address}
                <br />
                {contact.city}
              </a>
              {contact.phones.map((phone) => (
                <a key={phone.href} href={phone.href}>
                  {phone.label}
                </a>
              ))}
              <a href={contact.emailHref}>{contact.email}</a>
            </address>
            <div className="footer-certifications">
              <h3>Certifications</h3>
              <div className="footer-certification-badges">
                <img
                  src={iso9001}
                  width={4500}
                  height={4500}
                  alt="ISO 9001 certified quality management"
                  loading="lazy"
                  decoding="async"
                />
                <img
                  src={iso22000}
                  width={4501}
                  height={4500}
                  alt="ISO 22000 certified food safety management"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} MPB Packaging Limited. All rights
            reserved.
          </p>
          <a
            className="back-top"
            href={homeHref("#home")}
            aria-label="Back to Home"
          >
            <ArrowUp size={20} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
