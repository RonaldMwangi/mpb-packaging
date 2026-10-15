import "./Hero.css";

import { MotionConfig } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProductCarousel from "./ProductCarousel";

export default function Hero() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="hero" id="home" aria-labelledby="hero-heading">
        <ProductCarousel>
          <div className="hero-inner">
            <div className="hero-content">
              <p className="eyebrow hero-eyebrow">
                FLEXIBLE PACKAGING MANUFACTURER
              </p>
              <h1 className="hero-title" id="hero-heading">
                Built &amp; Designed for Brands
              </h1>
              <p className="lead hero-lead">
                Flexible packaging manufactured in Kenya — from custom printed
                pouches and sachets to films, liners and poly bags.
              </p>
              <div className="hero-actions">
                <a href="#contact" className="btn-on-dark btn-lg">
                  Request a Quote
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
                <a href="#products" className="btn-outline-on-dark btn-lg">
                  Explore Products
                </a>
              </div>
            </div>
          </div>
        </ProductCarousel>
      </section>
    </MotionConfig>
  );
}
