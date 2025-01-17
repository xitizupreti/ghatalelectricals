import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="logo">
        <Link href="/">
          <Image src="/images/logo.png" alt="Logo" width={128} height={128} />
        </Link>
      </div>
      <nav className="flex space-x-4">
        <Link href="/" className="hover:text-blue-400">
          Home
        </Link>
        <Link href="#products" className="hover:text-blue-400">
          Products
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
      <div className="flex space-x-4">
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
    </header>
  );
}
