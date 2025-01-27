import Image from "next/image";

export default function ClientReviews() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Client Reviews
        </h3>
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
          <Image
            src="/images/team1.jpg"
            alt="Client"
            width={96}
            height={96}
            className="mx-auto rounded-full border-4 border-blue-500"
          />
          <p className="mt-6 text-lg italic text-gray-600 text-center">
            &quot;Affordable pricing, durable products, and exceptional customer
            support. I&apos;m a regular customer now!&quot;
          </p>
          <div className="mt-4 text-center">
            <h4 className="font-semibold text-xl text-gray-800">Arun Thapa</h4>
            <p className="text-gray-600">Businessman</p>
          </div>
        </div>
      </div>
    </section>
  );
}
