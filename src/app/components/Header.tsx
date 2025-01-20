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
      setSearchOpen(false); // Close search bar after submission
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-800 text-white shadow-md z-50">
      <div className="flex items-center justify-between p-4">
        <div className="logo">
          <Link href="/">
            <Image src="/images/logo.png" alt="Logo" width={64} height={64} />
          </Link>
        </div>
        <button
          className="text-3xl md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className={`bx ${menuOpen ? "bx-x" : "bx-menu"}`}></i>
        </button>
        <nav className="hidden md:flex space-x-4">
          <Link href="/" className="hover:text-blue-400">
            Home
          </Link>
          <Link href="/categories" className="hover:text-blue-400">
            Categories
          </Link>
          <Link href="/about" className="hover:text-blue-400">
            About
          </Link>
          <Link href="/contact" className="hover:text-blue-400">
            Contact
          </Link>
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          <button
            className="text-3xl"
            onClick={() => setSearchOpen((prev) => !prev)}
          >
            <i className="bx bx-search"></i>
          </button>
          <Link href="/cart">
            <i className="bx bx-cart text-3xl"></i>
          </Link>
          <Link href="/admin" className="hover:text-blue-400 text-red-500">
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
              className="w-full max-w-md px-4 py-2 rounded-l-md text-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 px-4 py-2 rounded-r-md hover:bg-blue-600"
            >
              Search
            </button>
          </form>
        </div>
      )}
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col items-center space-y-2 p-4 md:hidden bg-gray-700">
          <Link
            href="/"
            className="hover:text-blue-400"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/categories"
            className="hover:text-blue-400"
            onClick={() => setMenuOpen(false)}
          >
            Categories
          </Link>
          <Link
            href="/about"
            className="hover:text-blue-400"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="hover:text-blue-400"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
          <Link
            href="/admin"
            className="hover:text-blue-400 text-red-500"
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
            >
              <i className="bx bx-search text-2xl"></i>
            </button>
            <Link href="/cart" onClick={() => setMenuOpen(false)}>
              <i className="bx bx-cart text-2xl"></i>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
