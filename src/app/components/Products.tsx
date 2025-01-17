export default function Products() {
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
      name: "Plug",
      price: "Rs. 100 - Rs. 200",
      image: "/images/product-5.png",
    },
    {
      id: 6,
      name: "Plug",
      price: "Rs. 100 - Rs. 200",
      image: "/images/product-6.jpg",
    },
    {
      id: 7,
      name: "Plug",
      price: "Rs. 100 - Rs. 200",
      image: "/images/product-7.jpg",
    },
    {
      id: 8,
      name: "Plug",
      price: "Rs. 100 - Rs. 200",
      image: "/images/product-8.jpg",
    },
    {
      id: 9,
      name: "Plug",
      price: "Rs. 100 - Rs. 200",
      image: "/images/product-9.jpg",
    },
    {
      id: 10,
      name: "Plug",
      price: "Rs. 100 - Rs. 200",
      image: "/images/product-10.jpg",
    },
    {
      id: 11,
      name: "Plug",
      price: "Rs. 100 - Rs. 200",
      image: "/images/product-11.png",
    },
    {
      id: 12,
      name: "Plug",
      price: "Rs. 100 - Rs. 200",
      image: "/images/product-12.jpg",
    },
  ];

  return (
    <section id="products" className="p-8">
      <h2 className="text-3xl font-bold text-center">Our Featured Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {products.map((product) => (
          <div key={product.id} className="border p-4 text-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
