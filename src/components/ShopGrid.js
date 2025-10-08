"use client";

import Link from "next/link";
import ShopCards from "./ShopCards";
import { useShopContext } from "@/contexts/ShopContext";
import Loading from "@/components/Loading";

const ShopGrid = () => {
  const { products, loading } = useShopContext();

  if (loading) return <Loading />;

  return (
    <section className="max-w-[1200px] mx-auto px-4 py-10">
      {/* Título + Ver más alineados */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[rgb(var(--foreground-rgb))]">
          ¡Descubre las ofertas de hoy!
        </h2>

        <Link
          href="/shop"
          className="text-base font-medium underline underline-offset-4 hover:opacity-70 transition"
          style={{ color: "rgb(var(--foreground-rgb))" }}
        >
          Ver más
        </Link>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        products.map((product) => <ShopCards key={product._id} product={product} />)
      )}
      </div>
    </section>
  );
}

export default ShopGrid;
