import hero1 from "../assets/Images/hero/hero1.png";
import hero2 from "../assets/Images/hero/hero2.png";
import hero3 from "../assets/Images/hero/hero3.png";
import hero4 from "../assets/Images/hero/hero4.png";
import hero6 from "../assets/Images/hero/hero6.png";
import hero7 from "../assets/Images/hero/hero7.png";

export interface HeroSlide {
  id: number;
  image: string;
  alt: string;
  title: string;
  width: number;
  height: number;
  /** Optical sizing within the reserved product area; never crops the PNG. */
  size: string;
  theme: "dark" | "light";
}

// Replace images here, independently of the layout. These transparent PNGs
// share a 1254px square canvas; size balances their different silhouettes.
// Keep transparent exports (PNG, WebP or AVIF) and update dimensions if needed.
export const heroSlides: HeroSlide[] = [
  { id: 1, image: hero1, title: "Stand-up pouches", alt: "MPB resealable stand-up pouch in white, navy and light blue", width: 1254, height: 1254, size: "100%", theme: "dark" },
  { id: 2, image: hero2, title: "Pillow pouches", alt: "MPB sealed pillow pouch in white, navy and light blue", width: 1254, height: 1254, size: "96%", theme: "light" },
  { id: 3, image: hero3, title: "Gusset pouches", alt: "MPB gusset pouch with a wide standing base", width: 1254, height: 1254, size: "100%", theme: "dark" },
  { id: 4, image: hero4, title: "Stick packs", alt: "Three MPB single-serve stick packs", width: 1254, height: 1254, size: "98%", theme: "light" },
  { id: 5, image: hero6, title: "Shrink wrap", alt: "Bottled water secured with transparent MPB shrink film", width: 1254, height: 1254, size: "96%", theme: "dark" },
  { id: 6, image: hero7, title: "Roll stock films", alt: "MPB printed flexible packaging film on a roll", width: 1254, height: 1254, size: "96%", theme: "light" },
];
