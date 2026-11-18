import { getProducts } from "@/lib/store";

export default async function ProductGrid({ limit }: { limit?: number }) {
  const products = (await getProducts()).filter((p) => p.name).slice(0, limit);
  return (
    <div className="products">
      {products.map((p, i) => (
        <div className={p.image ? "product has-image" : "product"} key={`${i}-${p.name}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {p.image && <img src={p.image} alt={p.name} loading="lazy" decoding="async" />}
          <div className="product-body">
            <div className="cat">{p.category}</div>
            <h3>{p.name}</h3>
            <p>{p.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
