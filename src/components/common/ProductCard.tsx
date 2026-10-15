import "./ProductCard.css";

interface ProductCardProps {
  id: number;
  title: string;
  description: string;
  image?: string;
}

export default function ProductCard({
  id,
  title,
  description,
  image,
}: ProductCardProps) {
  return (
    <article className="product-card" id={`product-${id}`}>
      <div className="product-card-image">
        {image ? (
          <img src={image} alt={`MPB ${title.toLowerCase()} packaging`} width={1448} height={1086} loading="lazy" decoding="async" />
        ) : (
          <span>Image Coming Soon</span>
        )}
      </div>

      <div className="product-card-content">
        <h3>{title}</h3>

        <p>{description}</p>

        <button className="learn-more">Learn More →</button>
      </div>
    </article>
  );
}
