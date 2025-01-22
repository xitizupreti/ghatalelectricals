import { Suspense } from "react";
import ProductList from "./ProductList";
import { getProducts } from "../lib/api";

export const metadata = {
  title: "Our Products",
  description: "Browse our wide range of products",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <section id="products" className="p-8">
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        }
      >
        <ProductList initialProducts={products} />
      </Suspense>
    </section>
  );
}
