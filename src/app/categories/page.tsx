import { Suspense } from "react";
import CategoryList from "./CategoryList";

export const metadata = {
  title: "Product Categories",
  description: "Browse our products by category",
};

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">
        Product Categories
      </h1>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          </div>
        }
      >
        <CategoryList />
      </Suspense>
    </div>
  );
}
