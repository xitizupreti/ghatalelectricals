"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-800 text-white shadow-md z-50">
      <div className="flex items-center justify-between p-4">
        <div className="logo">
          <Link href="/">
            <Image src="/images/logo.png" alt="Logo" width={64} height={64} />
          </Link>
        </div>
        <button
          className="text-xl md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className={`bx ${menuOpen ? "bx-x" : "bx-menu"}`}></i>
        </button>
        <nav className="hidden md:flex space-x-4">
          <Link href="/" className="hover:text-blue-400">
            Home
          </Link>
          <Link href="/about" className="hover:text-blue-400">
            About
          </Link>
          <Link href="/contact" className="hover:text-blue-400">
            Contact
          </Link>
          <Link href="/account" className="hover:text-blue-400">
            Account
          </Link>
        </nav>
        <div className="hidden md:flex space-x-4">
          <Link href="/search">
            <i className="bx bx-search text-xl"></i>
          </Link>
          <Link href="/user">
            <i className="bx bx-user text-xl"></i>
          </Link>
          <Link href="/cart">
            <i className="bx bx-cart text-xl"></i>
          </Link>
        </div>
      </div>
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
            href="/account"
            className="hover:text-blue-400"
            onClick={() => setMenuOpen(false)}
          >
            Account
          </Link>
          <div className="flex space-x-4">
            <Link href="/search" onClick={() => setMenuOpen(false)}>
              <i className="bx bx-search text-xl"></i>
            </Link>
            <Link href="/user" onClick={() => setMenuOpen(false)}>
              <i className="bx bx-user text-xl"></i>
            </Link>
            <Link href="/cart" onClick={() => setMenuOpen(false)}>
              <i className="bx bx-cart text-xl"></i>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
