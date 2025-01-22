import { CartProvider } from "./cart/CartContext";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Ghatal Electronics",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>
          <Header />
          <main className="pt-[163px]">{children}</main>
          <Footer />
        </CartProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
