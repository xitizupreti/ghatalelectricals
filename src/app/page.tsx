import Hero from "./components/Hero";
import ClientReviews from "./components/ClientReviews";
import UpdateNews from "./components/UpdateNews";
import Footer from "./components/Footer";
import Products from "./products/page";

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
