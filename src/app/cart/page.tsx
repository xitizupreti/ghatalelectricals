"use client";

import Image from "next/image";
import { useCart } from "./CartContext";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Cart() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const [loading, setLoading] = useState(false);

  const handleQuantityChange = (uniqueKey: string, quantity: number) => {
    if (quantity > 0) {
      updateQuantity(uniqueKey, quantity);
    }
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

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const itemPrice =
        typeof item.price === "string" ? parseFloat(item.price) : item.price;
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
    <section className="p-8">
      <h2 className="text-3xl font-bold text-center">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center mt-4">Your cart is empty.</p>
      ) : (
        <div className="mt-8 space-y-4">
          {cart.map((product) => (
            <div
              key={product.uniqueKey}
              className="flex items-center justify-between border p-4 "
            >
              <Image
                src={product.image || "images/placeholder.png"}
                alt={product.name}
                width={64}
                height={64}
                className="object-cover mr-3"
              />
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p>Rs. {formatPrice(product.price)}</p>
                <div className="flex items-center mt-2">
                  <label
                    htmlFor={`quantity-${product.uniqueKey}`}
                    className="mr-2"
                  >
                    Quantity:
                  </label>
                  <input
                    id={`quantity-${product.uniqueKey}`}
                    type="number"
                    defaultValue={1}
                    min={1}
                    step={1}
                    value={product.quantity}
                    onChange={(e) => {
                      const value = Math.min(
                        parseInt(e.target.value, 10),
                        1000
                      );
                      handleQuantityChange(product.uniqueKey, value);
                    }}
                    className="w-16 border rounded px-2 py-1"
                  />
                </div>
                {product.quantity > 10 && (
                  <p className="text-red-500 ml-2">Max 10 allowed</p>
                )}
              </div>
              <div>
                <p className="font-semibold">
                  Total: Rs.{" "}
                  {formatPrice(
                    Number(formatPrice(product.price)) * product.quantity
                  )}
                </p>
                <button
                  className="text-red-500 hover:underline mt-2"
                  onClick={() => removeFromCart(product.uniqueKey)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center mt-8">
            <div>
              <p className="text-xl font-bold">
                Total: Rs. {formatPrice(calculateTotal())}
              </p>
            </div>
            <div className="flex flex-col space-y-4 md:flex-row md:space-y-0">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-4"
                onClick={clearCart}
              >
                Clear Cart
              </button>
              <ToastContainer />
              <button
                disabled={loading}
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                onClick={handleCheckout}
              >
                {loading ? "Wait..." : "Checkout"}
              </button>
              {loading && (
                <div className="loading">
                  <div className="spinner"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
