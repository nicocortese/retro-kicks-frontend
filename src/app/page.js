import Hero from "@/components/Hero";
import ProductCarousel from "@/components/ProductCarousel";
import BrandLogos from "@/components/BrandLogos";
import ShopFeatures from "@/components/ShopFeatures";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProductCarousel />
      <BrandLogos />
      <ShopFeatures />
    </main>
  );
}
