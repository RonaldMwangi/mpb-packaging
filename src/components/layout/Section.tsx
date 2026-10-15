import React from "react";

interface SectionProps {
  children: React.ReactNode;
}

const Section = ({ children }: SectionProps) => {
  return <section className="section">{children}</section>;
};

export default Section;
