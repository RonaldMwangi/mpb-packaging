import "./SectionMotif.css";

type MotifVariant = "registration" | "halftone" | "dieline" | "web";

interface SectionMotifProps {
  variant: MotifVariant;
}

export default function SectionMotif({ variant }: SectionMotifProps) {
  return (
    <div className={`section-motif motif-${variant}`} aria-hidden="true">
      <span className="motif-registration-mark" />
      <span className="motif-crop-mark" />
      <span className="motif-halftone-field" />
      <span className="motif-dieline-path" />
      <span className="motif-film-web" />
      <span className="motif-registration-mark motif-secondary" />
      <span className="motif-crop-mark motif-secondary" />
    </div>
  );
}
