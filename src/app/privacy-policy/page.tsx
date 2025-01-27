export default function PrivacyPolicy() {
  return (
    <div className="bg-gradient-to-b from-gray-100 to-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
          Privacy Policy
        </h1>
        <div className="bg-white p-8 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
          <p className="text-lg mb-6">
            Your privacy is important to us. This Privacy Policy explains how we
            collect, use, and protect your personal information.
          </p>
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">
            Information We Collect
          </h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>
              Personal details such as name, email address, and contact
              information when you create an account or place an order.
            </li>
            <li>Payment information for processing transactions.</li>
            <li>Browsing data to enhance your shopping experience.</li>
          </ul>
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">
            How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>To process orders and provide customer support.</li>
            <li>To improve our website and services.</li>
            <li>
              To send updates, promotions, and newsletters, if subscribed.
            </li>
          </ul>
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">
            Your Rights
          </h2>
          <p className="text-lg mb-6">
            You have the right to access, update, or delete your personal
            information. To exercise these rights, please contact us.
          </p>
          <p className="text-lg">
            For detailed information, please reach out via our{" "}
            <a href="/contact" className="text-blue-600 hover:underline">
              Contact Us
            </a>{" "}
            page.
          </p>
        </div>
      </div>
    </div>
  );
}
