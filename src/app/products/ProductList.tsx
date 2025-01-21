"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "../cart/CartContext";
import { useRouter } from "next/navigation";

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

const ITEMS_PER_PAGE = 8;

export default function ProductList({ products }: ProductListProps) {
  const { addToCart, cart } = useCart();
  const router = useRouter();
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>(
    {}
  );
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
    const isInCart = cart.some((item) => item._id === product._id);
    if (!isInCart) {
      addToCart(product, quantities[product._id] || 1);
    }
    router.push("/cart");
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    setQuantities((prev) => ({ ...prev, [productId]: quantity }));
  };

  const handleImageError = (productId: string) => {
    setImageErrors((prev) => ({ ...prev, [productId]: true }));
  };

  const formatPrice = (price: number | string): string => {
    if (typeof price === "number") {
      return price.toFixed(2);
    }
    if (typeof price === "string") {
      const numPrice = Number.parseFloat(price);
      return isNaN(numPrice) ? price : numPrice.toFixed(2);
    }
    return "0.00";
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (!products || products.length === 0) {
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
                  src="images/placeholder.png"
                  alt="Placeholder"
                  fill
                  className="object-contain w-full h-full"
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
                defaultValue={1}
                min={1}
                max={10}
                value={quantities[product._id] || 1}
                className="w-full border rounded px-2 py-1"
                onChange={(e) => {
                  const value = Math.min(
                    Number.parseInt(e.target.value, 10),
                    10
                  );
                  handleQuantityChange(product._id, value);
                }}
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
            onClick={() => paginate(i + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
