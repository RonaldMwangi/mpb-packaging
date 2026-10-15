import { homeHref } from "../../utils/navigation";
import "./Navbar.css";
import logo from "../../assets/Images/logo.png";

import { ArrowRight, Menu, Search, X } from "lucide-react";

import { useEffect, useRef, useState } from "react";
import SiteSearch from "../common/SiteSearch";

const navItems = [
  { label: "Home", href: "#home", id: "home" },
  { label: "Products", href: "#products", id: "products" },
  { label: "Industries", href: "#industries", id: "industries" },
  { label: "Capabilities", href: "#manufacturing", id: "manufacturing" },
  { label: "Quality", href: "#quality", id: "quality" },
  { label: "Why MPB", href: "#why-mpb", id: "why-mpb" },
  { label: "Careers", href: "#careers", id: "careers" },
  { label: "Location", href: "#location", id: "location" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [overHero, setOverHero] = useState(window.location.pathname === "/");
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1181px)");
    const closeMobileMenu = () => { if (desktop.matches) setMenuOpen(false); };
    desktop.addEventListener("change", closeMobileMenu);
    return () => desktop.removeEventListener("change", closeMobileMenu);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const hero = document.getElementById("home");
      setOverHero(Boolean(hero && hero.getBoundingClientRect().bottom >
        (headerRef.current?.offsetHeight ?? 88) + 24));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-20% 0px -60%", threshold: [0, 0.2, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (menuOpen || searchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
        if (menuOpen) menuButtonRef.current?.focus();
      }
      if (event.key === "Tab" && menuOpen) {
        const controls = Array.from(headerRef.current?.querySelectorAll<HTMLElement>(
          ".mobile-open a, .mobile-open button, .mobile-menu-btn",
        ) ?? []);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen, searchOpen]);

  return (
    <header ref={headerRef} className={`navbar${scrolled ? " navbar-scrolled" : ""}${overHero ? " navbar-over-hero" : ""}${menuOpen ? " navbar-menu-open" : ""}`}>
      {menuOpen && (
        <div className="nav-overlay" onClick={() => setMenuOpen(false)} />
      )}

      <div className="container navbar-content">
        {/* Logo */}

        <a href={homeHref("#home")} className="logo">
          <img src={logo} alt="MPB Packaging Limited" />
        </a>

        {/* Navigation */}

        <nav aria-label="Primary navigation">
          <ul id="primary-navigation" className={menuOpen ? "nav-links mobile-open" : "nav-links"}>
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={homeHref(item.href)}
                  className={activeSection === item.id ? "active" : undefined}
                  aria-current={activeSection === item.id ? "location" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}

            <li className="nav-search-item">
              <button
                type="button"
                className="nav-search-button"
                aria-label="Search website"
                aria-haspopup="dialog"
                onClick={() => {
                  setMenuOpen(false);
                  setSearchOpen(true);
                }}
              >
                <Search size={19} aria-hidden="true" />
                <span className="nav-search-label">Search</span>
              </button>
            </li>

            <li className="mobile-quote-item">
              <a
                href={homeHref("#contact")}
                className="btn-primary nav-quote-link"
                onClick={() => setMenuOpen(false)}
              >
                Request a Quote
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            </li>
          </ul>
        </nav>

        {/* Desktop Button */}

        <a href={homeHref("#contact")} className="btn-primary quote-btn desktop-only">
          Request a Quote
          <ArrowRight size={18} aria-hidden="true" />
        </a>

        {/* Mobile Button */}

        <button
          ref={menuButtonRef}
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      <SiteSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
