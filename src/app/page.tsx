import Hero from "./components/Hero";
import ClientReviews from "./components/ClientReviews";
import UpdateNews from "./components/UpdateNews";
import Products from "./products/page";

export default function Home() {
  return (
    <div>
      <Hero />
      <Products />
      <ClientReviews />
      <UpdateNews />
    </div>
  );
}
