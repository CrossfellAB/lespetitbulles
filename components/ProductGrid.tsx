import { products } from "@/content/products";

export default function ProductGrid({ limit }: { limit?: number }) {
  return (
    <div className="products">
      {products.slice(0, limit).map((p) => (
        <div className="product" key={p.name}>
          <div className="cat">{p.category}</div>
          <h3>{p.name}</h3>
          <p>{p.description}</p>
        </div>
      ))}
    </div>
  );
}
