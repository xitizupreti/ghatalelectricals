import Image from "next/image";

export default function UpdateNews() {
  return (
    <section className="p-8">
      <h2 className="text-3xl font-bold text-center">New Updates</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="border p-4 flex flex-col items-center rounded-lg shadow-md">
          <Image
            src="/images/category-2.jpg"
            alt="Update"
            width={736}
            height={490}
            className="w-full object-cover rounded-lg"
          />
          <h5 className="mt-2 text-center">1 Jan 2025</h5>
          <h4 className="font-bold mt-2 text-center">
            Exciting Service Updates
          </h4>
          <p className="mt-2 text-center">
            Affordable pricing, durable products, and exceptional customer
            support. We are committed to providing the best service to our
            customers.
          </p>
        </div>
      </div>
    </section>
  );
}
