import { homeHref } from "../../utils/navigation";
import "./SiteSearch.css";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";

const searchItems = [
  { title: "Home", description: "MPB flexible packaging overview", href: "#home", keywords: "home packaging kenya" },
  { title: "Products", description: "Pouches, films, sleeves and roll stock", href: "#products", keywords: "products pouches film sleeves roll stock" },
  { title: "Industries", description: "Markets and industries served by MPB", href: "#industries", keywords: "industries food beverage agriculture pharmaceutical" },
  { title: "Capabilities", description: "Manufacturing and production capabilities", href: "#manufacturing", keywords: "capabilities manufacturing printing lamination" },
  { title: "Process", description: "From consultation through delivery", href: "#process", keywords: "process design prepress production delivery" },
  { title: "Quality", description: "Quality assurance at every stage", href: "#quality", keywords: "quality inspection materials control" },
  { title: "Why MPB", description: "Experience, standards and regional reach", href: "#why-mpb", keywords: "why mpb expertise experience" },
  { title: "Careers", description: "Career and graduate opportunities", href: "#careers", keywords: "careers jobs graduate opportunities" },
  { title: "Contact", description: "Talk to the MPB packaging team", href: "#contact", keywords: "contact quote telephone email" },
  { title: "Location", description: "Find the MPB manufacturing facility", href: "#location", keywords: "location directions mombasa kenya" },
] as const;

interface SiteSearchProps {
  open: boolean;
  onClose: () => void;
}

export default function SiteSearch({ open, onClose }: SiteSearchProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    window.requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return searchItems;
    return searchItems.filter(({ title, description, keywords }) =>
      `${title} ${description} ${keywords}`.toLowerCase().includes(term),
    );
  }, [query]);

  if (!open) return null;

  return (
    <div className="site-search" role="dialog" aria-modal="true" aria-labelledby="site-search-title">
      <button className="site-search-backdrop" aria-label="Close search" onClick={onClose} />
      <div className="site-search-panel">
        <div className="site-search-heading">
          <div>
            <span className="eyebrow">SITE SEARCH</span>
            <h2 id="site-search-title">Find what you need</h2>
          </div>
          <button className="site-search-close" type="button" aria-label="Close search" onClick={onClose}>
            <X size={22} aria-hidden="true" />
          </button>
        </div>

        <label className="site-search-field">
          <Search size={20} aria-hidden="true" />
          <span className="visually-hidden">Search website content</span>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products, capabilities, quality…"
          />
        </label>

        <div className="site-search-results" aria-live="polite">
          {results.length > 0 ? (
            results.map((item) => (
              <a key={item.href} href={homeHref(item.href)} onClick={onClose}>
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.description}</small>
                </span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            ))
          ) : (
            <p className="site-search-empty">No matching section found. Try products, quality or careers.</p>
          )}
        </div>
      </div>
    </div>
  );
}
