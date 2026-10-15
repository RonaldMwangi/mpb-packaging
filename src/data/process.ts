export interface ProcessStep {
  id: number;
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    id: 1,
    number: "01",
    title: "Consultation",
    description:
      "Understanding your packaging requirements and business objectives.",
  },
  {
    id: 2,
    number: "02",
    title: "Artwork & Design",
    description:
      "Preparing print-ready artwork with technical precision.",
  },
  {
    id: 3,
    number: "03",
    title: "Material Selection",
    description:
      "Choosing the right films and laminates for your application.",
  },
  {
    id: 4,
    number: "04",
    title: "Printing & Lamination",
    description:
      "High-quality production using advanced manufacturing technology.",
  },
  {
    id: 5,
    number: "05",
    title: "Quality Inspection",
    description:
      "Every batch undergoes strict quality control before dispatch.",
  },
  {
    id: 6,
    number: "06",
    title: "Delivery",
    description:
      "Reliable nationwide and regional delivery to your facility.",
  },
];