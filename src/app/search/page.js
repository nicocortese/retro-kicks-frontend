"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useShopContext } from "@/contexts/ShopContext";
import ShopCards from "@/components/ShopCards";
import Loading from "@/components/Loading";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const { products, loading } = useShopContext();

  if (loading) return <Loading />;

  if (!query || query.trim() === "") {
    return (
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center py-16">
          <h1 className="text-3xl font-bold mb-3 pt-10">
            Realiza una búsqueda
          </h1>
          <p className="text-lg text-gray-500">
            Ingresa un término en la barra de búsqueda para ver los productos.
          </p>
        </div>
      </section>
    );
  }

  const normalizedQuery = query.toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(normalizedQuery)
  );

  const resultCount = filteredProducts.length;
  const resultText =
    resultCount === 1 ? "1 resultado" : `${resultCount} resultados`;

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-3 pt-10">
          {resultText} para: "{query}"
        </h1>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ShopCards key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-gray-500 mb-8">
            No se encontraron productos para tu búsqueda.
          </p>
          <Link
            href="/shop"
            className="inline-block px-8 py-3 bg-[#D64541] text-white rounded-lg hover:bg-[#FF5B57] transition-colors font-medium"
          >
            Explorar Productos
          </Link>
        </div>
      )}
    </section>
  );
};

export default SearchPage;
