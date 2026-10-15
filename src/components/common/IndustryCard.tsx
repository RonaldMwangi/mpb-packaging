import "./IndustryCard.css";

interface Props {
  title: string;

  image?: string;
}

export default function IndustryCard({
  title,

  image,
}: Props) {
  return (
    <div className="industry-card">
      <div className="industry-image">
        {image ? (
          <img src={image} alt={`Flexible packaging for ${title.toLowerCase()}`} width={1448} height={1086} loading="lazy" decoding="async" />
        ) : (
          <span>Image Coming Soon</span>
        )}
      </div>

      <div className="industry-overlay">
        <h3>{title}</h3>

        <p>Explore →</p>
      </div>
    </div>
  );
}
