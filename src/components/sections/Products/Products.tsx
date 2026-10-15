import "./Products.css";
import { products } from "../../../data/products";
import SectionHeading from "../../common/SectionHeading";
import ProductCard from "../../common/ProductCard";
import SectionMotif from "../../common/SectionMotif";
import { motion } from "framer-motion";
import { revealViewport, siteFadeLeft, siteStaggerContainer } from "../../../utils/animations";

export default function Products() {
  return (
    <section className="products print-motif-section" id="products">
      <SectionMotif variant="registration" />
      <div className="container">
        <div className="products-header">
          <SectionHeading
            eyebrow="OUR SOLUTIONS"
            title="Flexible Packaging Solutions"
            description="Packaging engineered for performance, protection and outstanding shelf appeal across multiple industries."
            center={false}
          />

          <button className="btn-ghost">View All Products →</button>
        </div>

        <motion.div
          className="products-grid"
          variants={siteStaggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={siteFadeLeft}>
              <ProductCard
                id={product.id}
                title={product.title}
                description={product.description}
                image={product.image}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
