import { CartProvider } from "./cart/CartContext";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Ghatal Electronics",
  description: "Your one-stop shop for all electrical solutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </head>
      <body className="flex flex-col min-h-screen bg-gray-50">
        <CartProvider>
          <Header />
          <main className="flex-grow pt-16 md:pt-20">{children}</main>
          <Footer />
        </CartProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
