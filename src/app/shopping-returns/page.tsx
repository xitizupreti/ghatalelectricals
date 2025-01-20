// src/app/shopping-returns/page.js
export default function ShoppingReturns() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping & Returns</h1>
      <p className="mb-2">
        At our store, we aim to provide the best shopping experience for our
        customers. If you are not satisfied with your purchase, we have a
        straightforward returns policy:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Items can be returned within 30 days of purchase.</li>
        <li>
          The item must be in its original condition, with all tags and
          packaging intact.
        </li>
        <li>
          Refunds will be processed to the original payment method within 7-10
          business days.
        </li>
        <li>
          Shipping fees for returns are the responsibility of the customer
          unless the item is defective.
        </li>
      </ul>
      <p>
        For more information or to initiate a return, please contact our support
        team via the Contact Us page.
      </p>
    </div>
  );
}
