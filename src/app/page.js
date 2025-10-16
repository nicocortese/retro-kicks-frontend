import Hero from "@/components/Hero";
import ProductCarousel from "@/components/ProductCarousel";
import BrandLogos from "@/components/BrandLogos";
import ShopFeatures from "@/components/ShopFeatures";
import Trendings from "@/components/Trendings";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProductCarousel />
      <Trendings />
      <BrandLogos />
      <ShopFeatures />
    </main>
  );
}
