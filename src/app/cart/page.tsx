"use client";

import { useCart } from "./CartContext";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

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
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-cover"
              />
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p>{product.price}</p>
              </div>
              <button
                className="text-red-500 hover:underline"
                onClick={() => removeFromCart(product.uniqueKey)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </div>
      )}
    </section>
  );
}
