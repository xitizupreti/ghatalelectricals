"use client";

import Image from "next/image";
import { useCart } from "./CartContext";

export default function Cart() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

  const handleQuantityChange = (uniqueKey: string, quantity: number) => {
    if (quantity > 0) {
      updateQuantity(uniqueKey, quantity);
    }
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
              className="flex items-center justify-between border p-4"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={64}
                height={64}
                className="object-cover"
              />
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p>{product.price}</p>
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
                    min="1"
                    value={product.quantity}
                    onChange={(e) =>
                      handleQuantityChange(
                        product.uniqueKey,
                        parseInt(e.target.value, 10)
                      )
                    }
                    className="w-16 border rounded px-2 py-1"
                  />
                </div>
              </div>

              <button
                className="text-red-500 hover:underline"
                onClick={() => removeFromCart(product.uniqueKey)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex justify-between items-center mt-8">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={clearCart}
            >
              Clear Cart
            </button>
            <button
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
              onClick={() => (window.location.href = "/checkout")}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
