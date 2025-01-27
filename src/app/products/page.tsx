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
    <section id="products" className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Our Products
        </h2>
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
            </div>
          }
        >
          <ProductList initialProducts={products} />
        </Suspense>
      </div>
    </section>
  );
}
