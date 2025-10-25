"use client";

import ShopCards from "@/components/ShopCards";
import Loading from "@/components/Loading";
import { useShopContext } from "@/contexts/ShopContext";

const ShopPage = () => {
  const { products, loading } = useShopContext();

  if (loading) return <Loading />;

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-3 pt-10">
          Todos nuestros productos
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explorá el catálogo completo.
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ShopCards key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-gray-500">No se encontraron productos.</p>
        </div>
      )}
    </section>
  );
};

export default ShopPage;
