import { getCategories, getProductsByCategory } from "../lib/api";
import ProductList from "../products/ProductList";

export default async function CategoryList() {
  const categories = await getCategories();

  return (
    <div className="space-y-16">
      {categories.map((category) => (
        <CategorySection key={category} category={category} />
      ))}
    </div>
  );
}

async function CategorySection({ category }: { category: string }) {
  const products = await getProductsByCategory(category);

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">
        {category}
      </h2>
      <ProductList initialProducts={products} category={category} />
    </section>
  );
}
