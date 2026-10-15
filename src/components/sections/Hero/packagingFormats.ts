/* ==========================================================================
   MPB PACKAGING — HERO SEQUENCE
   --------------------------------------------------------------------------
   The order the hero cycles through. Add, remove or reorder formats here
   and the showcase follows automatically.

   To move to real photography later, swap the `art` component for one that
   renders an <img>. Nothing in the showcase component needs to change.
   ========================================================================== */

import {
  BreadBag,
  FlowWrapBread,
  GussetPouch,
  PillowPouch,
  RollStock,
  ShrinkSleeve,
  StandUpPouch,
} from "./packagingArt";

export interface PackagingFormat {
  /** Short label shown beneath the visual */
  label: string;
  /** Accessible description of the artwork */
  alt: string;
  art: () => React.ReactElement;
}

export const PACKAGING_FORMATS: PackagingFormat[] = [
  {
    label: "Stand-Up Pouches",
    alt: "Stand-up pouch with a bottom gusset and high-barrier laminate finish",
    art: StandUpPouch,
  },
  {
    label: "Gusset Pouches",
    alt: "Side-gusset pouch with reinforced folds for high-volume filling",
    art: GussetPouch,
  },
  {
    label: "Pillow Pouches",
    alt: "Pillow pouch with crimped fin seals at both ends",
    art: PillowPouch,
  },
  {
    label: "Bread Packaging",
    alt: "Printed bread bag with a gathered neck and bag clip",
    art: BreadBag,
  },
  {
    label: "Sleeves",
    alt: "Shrink sleeve conforming to a cylindrical container",
    art: ShrinkSleeve,
  },
  {
    label: "Roll Stock",
    alt: "Printed roll-stock film unwinding from the reel",
    art: RollStock,
  },
  {
    label: "Flexible Bread Packaging",
    alt: "Flow-wrapped bread loaf sealed in printed flexible film",
    art: FlowWrapBread,
  },
];
