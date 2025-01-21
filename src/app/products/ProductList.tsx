"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "../cart/CartContext";
import { useRouter, useSearchParams } from "next/navigation";

const ITEMS_PER_PAGE = 12;

type Product = {
  _id: string;
  name: string;
  price: number | string;
  image: string;
  quantity: number;
  category: string;
};

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const { addToCart, cart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleAddToCart = (product: Product) => {
    addToCart(product, quantities[product._id] || 1);
  };

  const handleBuyNow = (product: Product) => {
    setLoading(true);
    if (!cart.some((item) => item._id === product._id)) {
      addToCart(product, quantities[product._id] || 1);
    }
    router.push("/cart");
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, Math.min(quantity, 10)),
    }));
  };

  const handleImageError = (productId: string) => {
    setImageErrors((prev) => ({ ...prev, [productId]: true }));
  };

  const formatPrice = (price: number | string): string => {
    const numPrice = typeof price === "string" ? parseFloat(price) : price;
    return isNaN(numPrice) ? "0.00" : numPrice.toFixed(2);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery)
  );

  const currentItems = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  if (!products.length) {
    return (
      <p className="text-center mt-4">No products found in this category.</p>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {currentItems.map((product) => (
          <div key={product._id} className="border p-4 rounded-lg shadow-md">
            <div className="w-full h-48 relative mb-4">
              {!imageErrors[product._id] ? (
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="object-contain"
                  fill
                  onError={() => handleImageError(product._id)}
                />
              ) : (
                <Image
                  src="/images/placeholder.png"
                  alt="Placeholder"
                  fill
                  className="object-contain"
                />
              )}
            </div>
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-2">
              Rs. {formatPrice(product.price)}
            </p>
            <div className="mb-4">
              <label
                htmlFor={`quantity-${product._id}`}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Quantity
              </label>
              <input
                id={`quantity-${product._id}`}
                type="number"
                defaultValue={quantities[product._id] || 1}
                value={quantities[product._id]}
                min={1}
                className="w-full border rounded px-2 py-1"
                onChange={(e) =>
                  handleQuantityChange(
                    product._id,
                    parseInt(e.target.value, 10)
                  )
                }
              />
            </div>
            <div className="flex space-x-2">
              <button
                className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
              <button
                className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                onClick={() => handleBuyNow(product)}
                disabled={loading}
              >
                {loading ? "Processing..." : "Buy Now"}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center space-x-2 mt-8">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded transition-colors ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
