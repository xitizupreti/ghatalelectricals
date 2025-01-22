"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Product = {
  _id: string;
  name: string;
  price: number | string;
  image: string;
};

type CartItem = Product & { uniqueKey: string; quantity: number };

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (uniqueKey: string) => void;
  clearCart: () => void;
  clearCartCheckout: () => void;
  updateQuantity: (uniqueKey: string, quantity: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const addToCart = (product: Product, quantity: number) => {
    toast.success(`${product.name} - ${quantity} Successfully added to cart!`, {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
    const cartItem = {
      ...product,
      uniqueKey: `${product._id}-${Date.now()}`,
      quantity,
      price:
        typeof product.price === "string"
          ? parseFloat(product.price)
          : product.price,
      image: product.image, // Preserve Base64 image data
    };

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      let updatedCart;
      if (existingItem) {
        updatedCart = prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updatedCart = [...prevCart, cartItem];
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (uniqueKey: string) => {
    toast.warning("Removed from the Cart!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(
        (item) => item.uniqueKey !== uniqueKey
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const clearCart = () => {
    if (window.confirm("Want to clear the cart?")) {
      setCart([]);
      localStorage.removeItem("cart");
      toast.error(`Cart Cleared!`, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };
  const clearCartCheckout = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const updateQuantity = (uniqueKey: string, quantity: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.uniqueKey === uniqueKey ? { ...item, quantity } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        clearCartCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
