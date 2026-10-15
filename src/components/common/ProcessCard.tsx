import "./ProcessCard.css";

interface Props {
  number: string;
  title: string;
  description: string;
}

export default function ProcessCard({ number, title, description }: Props) {
  return (
    <article className="process-card">
      <div className="process-number">{number}</div>

      <h3>{title}</h3>

      <p>{description}</p>
    </article>
  );
}
