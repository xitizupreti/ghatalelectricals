import Image from "next/image";
import Link from "next/link";

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
            />
            <p>Kathmandu</p>
            <p>
              <a href="tel:+9779868761319" className="text-blue-500 underline">
                Phone: 9868761319
              </a>
            </p>
            <p>
              <a
                href="mailto:ghatalelectricals@gmail.com"
                className="text-blue-500 underline"
              >
                Email: ghatalelectricals@gmail.com
              </a>
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://facebook.com/share/19umtroo9S"
                aria-label="Facebook"
                className="text-xl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bx bxl-facebook"></i>
              </a>
              <a
                href="https://wa.me/9779868761319"
                aria-label="WhatsApp"
                className="text-xl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bx bxl-whatsapp"></i>
              </a>
            </div>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  About Page
                </Link>
              </li>
              <li>
                <Link href="/shopping-returns" className="hover:underline">
                  Shopping & Returns
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Shop Highlights */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Shop</h4>
            <ul>
              <li>High-Quality Electronics</li>
              <li>Affordable Prices</li>
              <li>Fast Delivery</li>
              <li>Excellent Customer Support</li>
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
              <button
                disabled
                className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p>
            Copyright © {new Date().getFullYear()}. All Rights Reserved.
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
