import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div>
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={128}
              height={128}
              className="mb-4"
              layout="intrinsic"
            />
            <p>Dadeldhura District, Mauroda</p>
            <p>Phone: 9848626549</p>
            <p>Email: abc@gmail.com</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" aria-label="Facebook" className="text-xl">
                <i className="bx bxl-facebook"></i>
              </a>
              <a href="#" aria-label="Twitter" className="text-xl">
                <i className="bx bxl-twitter"></i>
              </a>
              <a href="#" aria-label="Instagram" className="text-xl">
                <i className="bx bxl-instagram"></i>
              </a>
              <a href="#" aria-label="WhatsApp" className="text-xl">
                <i className="bx bxl-whatsapp"></i>
              </a>
              <a href="#" aria-label="YouTube" className="text-xl">
                <i className="bx bxl-youtube"></i>
              </a>
              <a href="#" aria-label="LinkedIn" className="text-xl">
                <i className="bx bxl-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul>
              <li>
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  About Page
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Shopping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Shop Highlights */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Shop</h4>
            <ul>
              <li>
                <a href="#" className="hover:underline">
                  High-Quality Electronics
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Affordable Prices
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Fast Delivery
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Excellent Customer Support
                </a>
              </li>
            </ul>
          </div>

          {/* Subscription Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Subscribe</h4>
            <p className="mb-4">
              Explore our best-selling and highly-rated products chosen by our
              customers.
            </p>
            <form>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 text-black rounded mb-4"
              />
              <button className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p>
            Copyright © 2024. All Rights Reserved. Designed By Bhawana Bhatt.
          </p>
        </div>
      </div>
    </footer>
  );
}
