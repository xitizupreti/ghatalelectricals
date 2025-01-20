import { getCategories, getProductsByCategory } from "../lib/api";
import ProductList from "../products/ProductList";

export default async function CategoryList() {
  const categories = await getCategories();

  return (
    <div className="space-y-12">
      {categories.map((category) => (
        <CategorySection key={category} category={category} />
      ))}
    </div>
  );
}

async function CategorySection({ category }: { category: string }) {
  const products = await getProductsByCategory(category);

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">{category}</h2>
      <ProductList products={products} />
    </section>
  );
}
