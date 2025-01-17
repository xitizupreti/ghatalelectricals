import Hero from "./components/Hero";
import Products from "./components/Products";
import ClientReviews from "./components/ClientReviews";
import UpdateNews from "./components/UpdateNews";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div>
      <Hero />
      <Products />
      <ClientReviews />
      <UpdateNews />
      <Footer />
    </div>
  );
}
