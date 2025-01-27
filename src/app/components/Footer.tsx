import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-lg text-blue-600 font-medium mb-4">Company</h3>
            <ul>
              <li>
                <Link href="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-lg text-blue-600 font-medium mb-4">Legal</h3>
            <ul>
              <li>
                <a href="/shopping-returns" className="hover:underline">
                  Shopping & Returns
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          {/* Column 3 */}
          <div>
            <h3 className="text-lg text-blue-600 font-medium mb-4">Shop</h3>
            <ul>
              <li>High-Quality Electronics</li>
              <li>Affordable Prices</li>
              <li>Fast Delivery</li>
              <li>Excellent Customer Support</li>
            </ul>
          </div>
          {/* Column 4 */}
          <div>
            <h3 className="text-lg text-blue-600 font-medium mb-4">
              Subscribe
            </h3>
            <form className="mt-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 text-gray-900 bg-white rounded-md mb-2"
              />
              <button
                disabled
                className="w-full bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700 transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Ghatal Electricals. All Rights
            Reserved.
            <br />
            Designed & Developed By: BhawanaBhatt &{" "}
            <a
              href="https://kshitizupreti.com.np"
              className="text-blue-500 hover:underline"
            >
              KshitizUpreti.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
