import Image from "next/image";

export default function ClientReviews() {
  return (
    <section className="p-8 bg-gray-100 text-center">
      <h3 className="text-2xl font-bold">Client Reviews</h3>
      <Image
        src="/images/team1.jpg"
        alt="Client"
        width={96}
        height={96}
        className="mx-auto rounded-full mt-4"
      />
      <p className="mt-4 italic">
        &quot;Affordable pricing, durable products, and exceptional customer
        support. I&apos;m a regular customer now!&quot;
      </p>
      <h4 className="mt-2 font-semibold">Arun Thapa</h4>
      <p>Businessman</p>
    </section>
  );
}
