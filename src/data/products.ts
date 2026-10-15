import pillow from "../assets/Images/products/Pillow Pouches.png";
import roll from "../assets/Images/products/Roll Stocks.png";
import standup from "../assets/Images/products/Stand-up Pouches.png";
import sachets from "../assets/Images/products/Sachets.png";
import sleeves from "../assets/Images/products/Shrink Sleeves.png";
import lidding from "../assets/Images/products/Lidding Films.png";

export interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    title: "Pillow Pouches",
    description:
      "Flexible packaging engineered for snacks, flour, cereals and consumer goods.",
    image: pillow,
  },
  {
    id: 2,
    title: "Roll Stock",
    description:
      "High-performance printed films for automated packaging machines.",
    image: roll,
  },
  {
    id: 3,
    title: "Stand-Up Pouches",
    description:
      "Premium retail packaging that maximizes shelf appeal.",
    image: standup,
  },
  {
    id: 4,
    title: "Sachets",
    description:
      "Convenient single-use packaging for powders, liquids and gels.",
    image: sachets,
  },
  {
    id: 5,
    title: "Shrink Sleeves",
    description:
      "360° branding solutions that enhance product visibility.",
    image: sleeves,
  },
  {
    id: 6,
    title: "Lidding Films",
    description:
      "Reliable sealing films for food and beverage applications.",
    image: lidding,
  },
];
