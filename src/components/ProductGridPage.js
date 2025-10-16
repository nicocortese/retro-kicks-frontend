"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import ShopCards from "@/components/ShopCards";
import Loading from "@/components/Loading";

const ProductGridPage = ({
  filterType,
  filterValue,
  titlePrefix,
  descriptionText,
}) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!filterValue) return; // ✅ Evita fetch innecesario si no hay filtro

    const fetchAndFilterProducts = async () => {
      setLoading(true);
      try {
        // 🔹 1. Obtenemos todos los productos
        const res = await axios.get("http://localhost:4000/products");
        const allProducts = res.data.products || [];

        // 🔹 2. Filtramos en el frontend
        let productsToShow = [];

        if (filterType === "category") {
          productsToShow = allProducts.filter(
            (p) => p.style?.toLowerCase() === filterValue.toLowerCase()
          );
        } else if (filterType === "brand") {
          productsToShow = allProducts.filter(
            (p) => p.brand?.toLowerCase() === filterValue.toLowerCase()
          );
        }

        setFilteredProducts(productsToShow);
      } catch (error) {
        console.error(
          `Error al buscar y filtrar productos por ${filterType}:`,
          error
        );
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAndFilterProducts();
  }, [filterType, filterValue]); // ✅ ordenado por convención

  if (loading) return <Loading />;

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      {/* 🔹 Título y descripción */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-3 capitalize">
          {titlePrefix} {filterValue}
        </h1>
        {descriptionText && (
          <p className="text-gray-600 max-w-2xl mx-auto">{descriptionText}</p>
        )}
      </div>

      {/* 🔹 Grilla de productos */}
      {filteredProducts.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <Link key={product._id} href={`/product/${product._id}`}>
              <ShopCards product={product} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-gray-500">
            No hay productos disponibles para esta búsqueda.
          </p>
          <Link
            href="/shop"
            className="inline-block mt-6 px-6 py-3 bg-[#D64541] text-white rounded hover:bg-[#FF5B57] transition"
          >
            Ver todos los productos
          </Link>
        </div>
      )}
    </section>
  );
};

export default ProductGridPage;
