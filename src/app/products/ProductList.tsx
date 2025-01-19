"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "../cart/CartContext";
import { useRouter } from "next/navigation";

type Product = {
  _id: string;
  name: string;
  price: number | string;
  image: string;
  quantity: number;
};

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleAddToCart = (product: Product) => {
    addToCart(product, quantities[product._id] || 1);
  };

  const handleBuyNow = () => {
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
      const numPrice = parseFloat(price);
      return isNaN(numPrice) ? price : numPrice.toFixed(2);
    }
    return "0.00";
  };

  if (!products || products.length === 0) {
    return <p className="text-center mt-4">No products found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
      {products.map((product) => (
        <div key={product._id} className="border p-4 text-center">
          <div className="w-full h-[200px] relative overflow-hidden">
            {!imageErrors[product._id] ? (
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="object-contain"
                fill
                onError={() => handleImageError(product._id)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                {product.name}
              </div>
            )}
          </div>
          <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
          <p>Rs. {formatPrice(product.price)}</p>
          <div className="mt-2">
            <label
              htmlFor={`quantity-${product._id}`}
              className="block text-sm"
            >
              Quantity
            </label>
            <input
              id={`quantity-${product._id}`}
              type="number"
              defaultValue={1}
              min={1}
              max={product.quantity}
              className="border rounded px-2 py-1 w-full"
              onChange={(e) =>
                handleQuantityChange(product._id, Number(e.target.value))
              }
            />
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600"
            onClick={() => handleAddToCart(product)}
          >
            Add to Cart
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 mt-2 rounded hover:bg-green-600 ml-2"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
        </div>
      ))}
    </div>
  );
}
