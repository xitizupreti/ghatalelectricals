"use client";

import Image from "next/image";
import { useCart } from "./CartContext";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Cart() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const [loading, setLoading] = useState(false);

  const handleQuantityChange = (uniqueKey: string, quantity: number) => {
    const validQuantity = Math.max(1, Math.min(quantity, 1000));
    if (validQuantity > 0) {
      updateQuantity(uniqueKey, validQuantity);
    }
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

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const itemPrice =
        typeof item.price === "string"
          ? Number.parseFloat(item.price)
          : item.price;
      return total + itemPrice * item.quantity;
    }, 0);
  };

  const handleCheckout = () => {
    if (cart.some((product) => product.quantity > 10)) {
      toast.warning("Please Check warnings above in the Cart Items.", {
        theme: "colored",
      });
      return;
    }
    setLoading(true);
    window.location.href = "/checkout";
  };

  return (
    <section className="p-4 md:p-8 max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Your Cart
      </h2>
      {cart.length === 0 ? (
        <p className="text-center mt-4 text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((product) => (
            <div
              key={product.uniqueKey}
              className="flex flex-col md:flex-row items-center justify-between border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center w-full md:w-2/5 mb-4 md:mb-0">
                <div className="w-24 h-24 mr-4 relative rounded-md overflow-hidden">
                  <Image
                    src={product.image || "/images/placeholder.png"}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-semibold text-lg text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-gray-600">
                    Rs. {formatPrice(product.price)}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between w-full md:w-3/5">
                <div className="flex items-center space-x-2">
                  <label
                    htmlFor={`quantity-${product.uniqueKey}`}
                    className="mr-2 whitespace-nowrap text-gray-700"
                  >
                    Quantity:
                  </label>
                  <div className="flex items-center space-x-2">
                    <button
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-300 transition-colors duration-300"
                      onClick={() =>
                        handleQuantityChange(
                          product.uniqueKey,
                          product.quantity - 1
                        )
                      }
                    >
                      -
                    </button>
                    <input
                      id={`quantity-${product.uniqueKey}`}
                      type="text"
                      value={product.quantity}
                      onChange={(e) => {
                        const value = Number.parseInt(e.target.value, 10);
                        handleQuantityChange(
                          product.uniqueKey,
                          isNaN(value) ? 1 : value
                        );
                      }}
                      className="w-16 text-center border border-gray-300 rounded-md px-2 py-1 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-300 transition-colors duration-300"
                      onClick={() =>
                        handleQuantityChange(
                          product.uniqueKey,
                          product.quantity + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  {product.quantity > 10 && (
                    <p className="text-red-500 mt-2 w-full text-center md:text-right text-sm">
                      Max 10 allowed
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">
                    Total: Rs.{" "}
                    {formatPrice(
                      Number(formatPrice(product.price)) * product.quantity
                    )}
                  </p>
                  <button
                    className="text-red-500 hover:text-red-700 mt-2 transition-colors duration-300"
                    onClick={() => removeFromCart(product.uniqueKey)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="flex flex-col md:flex-row justify-between items-center mt-8 space-y-4 md:space-y-0 border-t border-gray-200 pt-6">
            <div>
              <p className="text-xl font-bold text-gray-800">
                Total: Rs. {formatPrice(calculateTotal())}
              </p>
            </div>
            <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
              <button
                className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors duration-300"
                onClick={clearCart}
              >
                Clear Cart
              </button>
              <button
                disabled={loading}
                className="bg-green-500 text-white px-8 py-2 rounded-full hover:bg-green-600 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={handleCheckout}
              >
                {loading ? "Processing..." : "Checkout"}
              </button>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
        </div>
      )}
    </section>
  );
}
