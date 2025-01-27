import Image from "next/image";

export default function AboutPage() {
  return (
    <section className="bg-gradient-to-b from-gray-100 to-white text-gray-800 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
          About Us
        </h1>
        <p className="text-lg leading-relaxed mb-8">
          Welcome to{" "}
          <strong className="text-blue-600">Ghatal Electricals</strong>, your
          trusted partner for all your electrical needs. Located in the heart of
          Dadeldhura District, Mauroda, we are proud to serve our community with
          high-quality electrical products and unparalleled customer service.
          With years of expertise, we have built a reputation for delivering
          reliable and affordable electrical solutions to homes and businesses
          alike.
        </p>

        <div className="bg-white p-8 shadow-lg rounded-lg mb-8 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">
            Our Mission
          </h2>
          <p className="text-lg">
            At Ghatal Electricals, our mission is to empower our customers with
            the best electrical products that ensure safety, efficiency, and
            performance. We aim to make your everyday life brighter, simpler,
            and more connected.
          </p>
        </div>

        <div className="bg-white p-8 shadow-lg rounded-lg mb-8 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">
            What We Offer
          </h2>
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

        <div className="bg-white p-8 shadow-lg rounded-lg mb-8 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">
            Why Choose Us?
          </h2>
          <p className="text-lg mb-4">
            At Ghatal Electricals, we believe in building long-term
            relationships with our customers. Here&apos;s why we stand out:
          </p>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li>Trusted expertise in the electrical industry.</li>
            <li>A wide range of products tailored to meet diverse needs.</li>
            <li>Commitment to quality and customer satisfaction.</li>
            <li>
              A local business with a personal touch, serving the community with
              pride.
            </li>
          </ul>
        </div>

        <div className="bg-white p-8 shadow-lg rounded-lg mb-8 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">
            Connect With Us
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <p className="text-lg mb-4">
                Visit us at our location in Dadeldhura District, Mauroda, or get
                in touch with us via phone or email.
              </p>
              <ul className="text-lg space-y-2">
                <li>
                  <strong>Phone:</strong> 9848626549
                </li>
                <li>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:ghatalelectricals@gmail.com"
                    className="text-blue-600 hover:underline"
                  >
                    ghatalelectricals@gmail.com
                  </a>
                </li>
              </ul>
            </div>
            <div className="text-center">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={128}
                height={128}
                className="mb-4 mx-auto"
              />
              <p className="mb-2">Kathmandu</p>
              <p className="mb-2">
                <a
                  href="tel:+9779868761319"
                  className="text-blue-600 hover:underline"
                >
                  Phone: 9868761319
                </a>
              </p>
              <p className="mb-4">
                <a
                  href="mailto:ghatalelectricals@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  Email: ghatalelectricals@gmail.com
                </a>
              </p>
              <div className="flex justify-center space-x-4">
                <a
                  href="https://facebook.com/share/19umtroo9S"
                  aria-label="Facebook"
                  className="text-2xl text-blue-600 hover:text-blue-800 transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bx bxl-facebook"></i>
                </a>
                <a
                  href="https://wa.me/9779868761319"
                  aria-label="WhatsApp"
                  className="text-2xl text-green-600 hover:text-green-800 transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bx bxl-whatsapp"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
