export default function AboutPage() {
  return (
    <section className="bg-gray-100 text-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
        <p className="text-lg leading-relaxed mb-6">
          Welcome to <strong>Ghatal Electricals</strong>, your trusted partner
          for all your electrical needs. Located in the heart of Dadeldhura
          District, Mauroda, we are proud to serve our community with
          high-quality electrical products and unparalleled customer service.
          With years of expertise, we have built a reputation for delivering
          reliable and affordable electrical solutions to homes and businesses
          alike.
        </p>

        <div className="bg-white p-6 shadow-md rounded-md mb-6">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg">
            At Ghatal Electricals, our mission is to empower our customers with
            the best electrical products that ensure safety, efficiency, and
            performance. We aim to make your everyday life brighter, simpler,
            and more connected.
          </p>
        </div>

        <div className="bg-white p-6 shadow-md rounded-md mb-6">
          <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li>
              High-quality electrical products, including wires, tools,
              appliances, and more.
            </li>
            <li>
              Affordable pricing to ensure you get the best value for your
              money.
            </li>
            <li>Fast and reliable delivery services to your doorstep.</li>
            <li>
              Excellent customer support to help you with all your queries and
              concerns.
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 shadow-md rounded-md mb-6">
          <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
          <p className="text-lg">
            At Ghatal Electricals, we believe in building long-term
            relationships with our customers. Here’s why we stand out:
          </p>
          <ul className="list-disc list-inside text-lg space-y-2 mt-4">
            <li>Trusted expertise in the electrical industry.</li>
            <li>A wide range of products tailored to meet diverse needs.</li>
            <li>Commitment to quality and customer satisfaction.</li>
            <li>
              A local business with a personal touch, serving the community with
              pride.
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 shadow-md rounded-md">
          <h2 className="text-2xl font-semibold mb-4">Connect With Us</h2>
          <p className="text-lg mb-4">
            Visit us at our location in Dadeldhura District, Mauroda, or get in
            touch with us via phone or email.
          </p>
          <ul className="text-lg space-y-2">
            <li>
              <strong>Phone:</strong> 9848626549
            </li>
            <li>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:abc@gmail.com"
                className="text-blue-600 hover:underline"
              >
                abc@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
