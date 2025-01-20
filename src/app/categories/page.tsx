import { Suspense } from "react";
import CategoryList from "./CategoryList";

export const metadata = {
  title: "Product Categories",
  description: "Browse our products by category",
};

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Product Categories
      </h1>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        }
      >
        <CategoryList />
      </Suspense>
    </div>
  );
}
