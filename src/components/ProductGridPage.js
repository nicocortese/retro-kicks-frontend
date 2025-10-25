"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ShopCards from "@/components/ShopCards";
import Loading from "@/components/Loading";
import { useShopContext } from "@/contexts/ShopContext";

const ProductGridPage = ({ filterValue, titlePrefix, descriptionText }) => {
  const { products, categories, loading } = useShopContext();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (!filterValue || products.length === 0 || categories.length === 0)
      return;

    const currentCategory = categories.find((cat) => cat.slug === filterValue);
    if (!currentCategory) {
      setFilteredProducts([]);
      return;
    }
    const categoryId = currentCategory._id;

    const productsToShow = products.filter((product) =>
      product.categories.includes(categoryId)
    );

    setFilteredProducts(productsToShow);
  }, [filterValue, products, categories]);

  if (loading) return <Loading />;

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-3 capitalize pt-10">
          {titlePrefix} {filterValue}
        </h1>
        {descriptionText && (
          <p className="text-red max-w-2xl mx-auto">{descriptionText}</p>
        )}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md-grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ShopCards key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-[#272626]/80">
            No hay productos disponibles para esta búsqueda.
          </p>
          <Link
            href="/shop"
            className="inline-block mt-6 px-6 py-3 bg-[#D64541] text-[#ffefef] rounded hover:bg-[#FF5B57] transition"
          >
            Ver todos los productos
          </Link>
        </div>
      )}
    </section>
  );
};

export default ProductGridPage;
