import placeholder from "../assets/Images/hero/hero-placeholder.png";

export interface HeroImage {
  id: string;
  src: string;
  alt: string;
  label: string;
}

// Ordered sequence for the hero — uses existing transparent assets in the
// project. Filenames were inspected and mapped to the requested categories.
export const HERO_IMAGES: HeroImage[] = [
  { id: "state-1", src: placeholder, alt: "Unbranded flexible packaging", label: "Stand-Up Pouches" },
  { id: "state-2", src: placeholder, alt: "Unbranded flexible packaging", label: "Gusset Pouches" },
  { id: "state-3", src: placeholder, alt: "Unbranded flexible packaging", label: "Pillow Pouches" },
  { id: "state-4", src: placeholder, alt: "Unbranded flexible packaging", label: "Bread Packaging" },
  { id: "state-5", src: placeholder, alt: "Unbranded flexible packaging", label: "Roll Stock" },
];
