import ProductList from "./ProductList";

async function getProducts() {
  const res = await fetch(`${process.env.API_URL}/api/products`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <section id="products" className="p-8">
      <h2 className="text-3xl font-bold text-center">Our Featured Products</h2>
      <ProductList products={products} />
    </section>
  );
}
