import "./FeatureCard.css";

interface Props {
  title: string;
  description: string;
}

export default function FeatureCard({ title, description }: Props) {
  return (
    <article className="feature-card">
      <div className="feature-icon">✓</div>

      <h3>{title}</h3>

      <p>{description}</p>
    </article>
  );
}
