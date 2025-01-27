export default function ShoppingReturns() {
  return (
    <div className="bg-gradient-to-b from-gray-100 to-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
          Shopping & Returns
        </h1>
        <div className="bg-white p-8 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
          <p className="text-lg mb-6">
            At our store, we aim to provide the best shopping experience for our
            customers. If you are not satisfied with your purchase, we have a
            straightforward returns policy:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Items can be returned within 30 days of purchase.</li>
            <li>
              The item must be in its original condition, with all tags and
              packaging intact.
            </li>
            <li>
              Refunds will be processed to the original payment method within
              7-10 business days.
            </li>
            <li>
              Shipping fees for returns are the responsibility of the customer
              unless the item is defective.
            </li>
          </ul>
          <p className="text-lg">
            For more information or to initiate a return, please contact our
            support team via the{" "}
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
