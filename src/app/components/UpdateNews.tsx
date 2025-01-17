import Image from "next/image";

export default function UpdateNews() {
  return (
    <section className="p-8">
      <h2 className="text-3xl font-bold text-center">New Updates</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="border p-4">
          <Image
            src="/images/category-2.jpg"
            alt="Update"
            layout="responsive" // Ensures the image takes up the full width
            width={100}
            height={50}
          />
          <h5 className="mt-2">1 Jan 2025</h5>
          <h4 className="font-bold">Exciting Service Updates</h4>
          <p className="mt-2">
            Affordable pricing, durable products, and exceptional customer
            support.
          </p>
        </div>
      </div>
    </section>
  );
}
