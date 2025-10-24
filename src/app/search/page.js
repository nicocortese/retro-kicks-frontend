"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useShopContext } from "@/contexts/ShopContext";
import ShopCards from "@/components/ShopCards";
import Loading from "@/components/Loading";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const { products, loading } = useShopContext();

  if (loading) return <Loading />;

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query ? query.toLowerCase() : "")
  );

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-3 pt-10">Resultados para: "{query}"</h1>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ShopCards key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-gray-500">
            No se encontraron productos para tu búsqueda.
          </p>
        </div>
      )}
    </section>
  );
};

const SearchPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SearchResults />
    </Suspense>
  );
};

export default SearchPage;
