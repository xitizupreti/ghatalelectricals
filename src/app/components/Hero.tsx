export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Welcome to Ghatal Electricals
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Your one-stop shop for all electrical solutions
        </p>
        <a
          href="#products"
          className="inline-block bg-white text-blue-600 px-6 py-3 rounded-full font-semibold text-lg transition-colors duration-300 hover:bg-blue-100"
        >
          Shop Now
        </a>
      </div>
    </section>
  );
}
