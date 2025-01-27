import Image from "next/image";

export default function UpdateNews() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          New Updates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
            <Image
              src="/images/category-2.jpg"
              alt="Update"
              width={736}
              height={490}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-2">1 Jan 2025</p>
              <h4 className="font-bold text-xl mb-2 text-gray-800">
                Exciting Service Updates
              </h4>
              <p className="text-gray-600">
                Affordable pricing, durable products, and exceptional customer
                support. We are committed to providing the best service to our
                customers.
              </p>
            </div>
          </div>
          {/* You can add more update cards here */}
        </div>
      </div>
    </section>
  );
}
