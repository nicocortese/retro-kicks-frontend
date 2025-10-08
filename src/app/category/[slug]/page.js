"use client";

import { useEffect } from "react";
import { useShopContext } from "@/contexts/ShopContext";
import ShopCards from "@/components/ShopCards";

const Categorypage = ({ params }) => {
  const { slug } = params;
  const { categoryProducts, getProductsByCategory, loading } = useShopContext();

  useEffect(() => {
    if (slug) {
      getProductsByCategory(slug);
    }
  }, [slug, getProductsByCategory]);

  return (
    <section className="max-w-[1200px] mx-auto px-4 py-10 pt-24">
      <h2 className="text-3xl font-bold text-center mb-8">
        Zapatillas: {slug}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
            <p>Cargando productos...</p>
        ) : categoryProducts.length > 0 ? (
            categoryProducts.map((product) => <ShopCards key={product._id} product={product} />)
        ) : (
            <p>No se encontraron productos en esta categoría.</p>
        )}
      </div>
    </section>
  );
};

export default Categorypage;
