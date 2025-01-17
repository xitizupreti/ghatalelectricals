"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useCart } from "../cart/CartContext";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
};

export default function Products() {
  const { addToCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  const products = [
    {
      id: 1,
      name: "Pliers",
      price: "Rs. 100 - Rs. 200",
      image: "/images/product-1.jpg",
    },
    {
      id: 2,
      name: "Palas",
      price: "Rs. 100 - Rs. 200",
      image: "/images/product-2.jpg",
    },
    {
      id: 3,
      name: "Screwdriver",
      price: "Rs. 100 - Rs. 200",
      image: "/images/product-3.jpg",
    },
    {
      id: 4,
      name: "Plug",
      price: "Rs. 100 - Rs. 200",
      image: "/images/product-4.png",
    },
    {
      id: 5,
      name: "Switch Button",
      price: "Rs. 100 - Rs. 200",
      image: "/images/product-5.png",
    },
    {
      id: 6,
      name: "Electric Wire",
      price: "Rs. 100 - Rs. 200",
      image: "/images/product-6.jpg",
    },
    {
      id: 7,
      name: "Bulb",
      price: "Rs. 100 - Rs. 200",
      image: "/images/product-7.jpg",
    },
    {
      id: 8,
      name: "Measuring Tape",
      price: "Rs. 100 - Rs. 200",
      image: "/images/product-8.jpg",
    },
    {
      id: 9,
      name: "Fan",
      price: "Rs. 100 - Rs. 200",
      image: "/images/product-9.jpg",
    },
    {
      id: 10,
      name: "Copper Magnet Wire",
      price: "Rs. 100 - Rs. 200",
      image: "/images/product-10.jpg",
    },
    {
      id: 11,
      name: "Rice Cooker",
      price: "Rs. 100 - Rs. 200",
      image: "/images/product-11.png",
    },
    {
      id: 12,
      name: "Steel Nail",
      price: "Rs. 100 - Rs. 200",
      image: "/images/product-12.jpg",
    },
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery)
  );

  const handleBuyNow = (product: Product) => {
    addToCart(product);
    router.push("/cart");
  };

  return (
    <section id="products" className="p-8">
      <h2 className="text-3xl font-bold text-center">Our Featured Products</h2>
      {searchQuery && (
        <p className="text-center text-gray-500">
          Showing results for: <strong>{searchQuery}</strong>
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border p-4 text-center">
            <div className="w-full h-[200px] relative overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                className="object-contain"
                layout="fill"
              />
            </div>
            <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
            <p>{product.price}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 mt-2 rounded hover:bg-green-600 ml-2"
              onClick={() => handleBuyNow(product)}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <p className="text-center mt-4 text-gray-500">No products found.</p>
      )}
    </section>
  );
}
