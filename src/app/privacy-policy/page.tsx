// src/app/privacy-policy/page.js
export default function PrivacyPolicy() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        Your privacy is important to us. This Privacy Policy explains how we
        collect, use, and protect your personal information.
      </p>
      <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>
          Personal details such as name, email address, and contact information
          when you create an account or place an order.
        </li>
        <li>Payment information for processing transactions.</li>
        <li>Browsing data to enhance your shopping experience.</li>
      </ul>
      <h2 className="text-xl font-semibold mb-2">
        How We Use Your Information
      </h2>
      <ul className="list-disc pl-6 mb-4">
        <li>To process orders and provide customer support.</li>
        <li>To improve our website and services.</li>
        <li>To send updates, promotions, and newsletters, if subscribed.</li>
      </ul>
      <h2 className="text-xl font-semibold mb-2">Your Rights</h2>
      <p className="mb-4">
        You have the right to access, update, or delete your personal
        information. To exercise these rights, please contact us.
      </p>
      <p>For detailed information, please reach out via our Contact Us page.</p>
    </div>
  );
}
