"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "../cart/CartContext";
import { useRouter, useSearchParams } from "next/navigation";

const ITEMS_PER_PAGE = 9;

type Product = {
  _id: string;
  name: string;
  price: number | string;
  image: string;
  quantity: number;
  category: string;
};

interface ProductListProps {
  initialProducts: Product[];
  category?: string;
}

export default function ProductList({
  initialProducts,
  category,
}: ProductListProps) {
  const { addToCart, cart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [imageLoading, setImageLoading] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = category
          ? `/api/products?category=${encodeURIComponent(category)}`
          : "/api/products";
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [category]);

  useEffect(() => {
    const element = document.getElementById("products");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
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
    setQuantities((prev) => ({ ...prev, [productId]: quantity }));
  };

  const handleImageError = (productId: string) => {
    setImageErrors((prev) => ({ ...prev, [productId]: true }));
    setImageLoading((prev) => ({ ...prev, [productId]: false }));
  };

  const handleImageLoading = (productId: string, isLoading: boolean) => {
    setImageLoading((prev) => ({ ...prev, [productId]: isLoading }));
  };

  const formatPrice = (price: number | string): string => {
    const numPrice =
      typeof price === "string" ? Number.parseFloat(price) : price;
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {currentItems.map((product) => (
          <div key={product._id} className="border p-4 rounded-lg shadow-md">
            <div className="w-full h-48 relative mb-4">
              {imageLoading[product._id] && (
                <div className="flex justify-center items-center h-48">
                  <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                </div>
              )}
              {!imageErrors[product._id] ? (
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className={`object-contain transition-opacity duration-300 ${
                    imageLoading[product._id] ? "opacity-0" : "opacity-100"
                  }`}
                  fill
                  onError={() => handleImageError(product._id)}
                  onLoadStart={() => handleImageLoading(product._id, true)}
                  onLoad={() => handleImageLoading(product._id, false)}
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
              <div className="flex items-center space-x-2">
                <button
                  className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                  onClick={() => {
                    const newQuantity = Math.max(
                      (quantities[product._id] || 1) - 1,
                      1
                    );
                    handleQuantityChange(product._id, newQuantity);
                  }}
                >
                  -
                </button>
                <input
                  id={`quantity-${product._id}`}
                  type="text"
                  placeholder="1"
                  value={quantities[product._id]}
                  onChange={(e) => {
                    const value = Math.min(
                      Math.max(Number.parseInt(e.target.value || "1", 10), 1),
                      1000
                    );
                    handleQuantityChange(product._id, value);
                  }}
                  className="w-20 text-center border rounded px-2 py-1 appearance-none"
                />
                <button
                  className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                  onClick={() => {
                    const newQuantity = Math.min(
                      (quantities[product._id] || 1) + 1,
                      1000
                    );
                    handleQuantityChange(product._id, newQuantity);
                  }}
                >
                  +
                </button>{" "}
                {quantities[product._id] > 10 && (
                  <p className="text-red-500 ml-2">Max 10 allowed</p>
                )}
              </div>
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
