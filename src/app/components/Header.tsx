"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      router.push(`/products?search=${searchQuery}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-800 text-white shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="logo">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={85}
              height={85}
              className="rounded-full"
            />
          </Link>
        </div>
        <button
          className="text-3xl md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className={`bx ${menuOpen ? "bx-x" : "bx-menu"}`}></i>
        </button>
        <nav className="hidden md:flex space-x-6">
          <Link
            href="/"
            className="hover:text-blue-400 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            href="/categories"
            className="hover:text-blue-400 transition-colors duration-300"
          >
            Categories
          </Link>
          <Link
            href="/about"
            className="hover:text-blue-400 transition-colors duration-300"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="hover:text-blue-400 transition-colors duration-300"
          >
            Contact
          </Link>
        </nav>
        <div className="hidden md:flex items-center space-x-6">
          <button
            className="text-2xl hover:text-blue-400 transition-colors duration-300 focus:outline-none"
            onClick={() => setSearchOpen((prev) => !prev)}
          >
            <i className="bx bx-search"></i>
          </button>
          <Link
            href="/cart"
            className="text-2xl hover:text-blue-400 transition-colors duration-300"
          >
            <i className="bx bx-cart"></i>
          </Link>
          <Link
            href="/admin"
            className="hover:text-blue-400 text-red-500 transition-colors duration-300"
          >
            Admin Login
          </Link>
        </div>
      </div>
      {/* Search Form */}
      {searchOpen && (
        <div className="bg-gray-700 p-4">
          <form
            onSubmit={handleSearch}
            className="flex items-center justify-center"
          >
            <input
              type="text"
              placeholder="Search products..."
              className="w-full max-w-md px-4 py-2 rounded-l-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 px-4 py-2 rounded-r-md hover:bg-blue-600 transition-colors duration-300"
            >
              Search
            </button>
          </form>
        </div>
      )}
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-700">
          <nav className="flex flex-col items-center space-y-4 py-4">
            <Link
              href="/"
              className="hover:text-blue-400 transition-colors duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/categories"
              className="hover:text-blue-400 transition-colors duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              href="/about"
              className="hover:text-blue-400 transition-colors duration-300"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="hover:text-blue-400 transition-colors duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/admin"
              className="hover:text-blue-400 text-red-500 transition-colors duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Admin Login
            </Link>
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setSearchOpen(true);
                }}
                className="text-2xl hover:text-blue-400 transition-colors duration-300"
              >
                <i className="bx bx-search"></i>
              </button>
              <Link
                href="/cart"
                onClick={() => setMenuOpen(false)}
                className="text-2xl hover:text-blue-400 transition-colors duration-300"
              >
                <i className="bx bx-cart"></i>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
