"use client";
import { FiEye, FiHeart } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

const ShopCards = ({ product }) => {
  const { _id, name, images, price, discount } = product;

  const primaryImage = images && images.length > 0 ? images[0] : null;

  const finalPrice = discount ? price - discount : price;

  return (
    <article
      className="relative group rounded-xl border border-neutral-800 shadow hover:shadow-xl transition overflow-hidden flex flex-col h-full"
      style={{
        backgroundColor: `rgb(var(--card-bg-rgb))`,
        color: `rgb(var(--card-text-rgb))`,
      }}
    >
      {/* Imagen y capa de acciones */}
      <div className="relative w-full aspect-square flex items-center justify-center overflow-hidden">
        {primaryImage ? (
          <Image
            src={`/assets/imgs/${primaryImage}`}
            alt={`Imagen de ${name}`}
            width={400}
            height={400}
            className="object-contain p-4 rounded-xl transition-all duration-300 group-hover:scale-105 group-hover:opacity-70"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-center p-4 bg-gray-100 text-gray-500 font-semibold">
            No hay imagen disponible.
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Ir al detalle */}
          <Link
            href={`/product/${product._id}`}
            className="p-3 rounded-full bg-black/40 hover:bg-[#D64541] text-white transition-colors"
            aria-label="Ver producto"
          >
            <FiEye className="w-5 h-5" />
          </Link>

          {/* Wishlist */}
          <button
            className="p-3 rounded-full bg-black/40 hover:bg-[#D64541] text-white transition-colors"
            aria-label="Añadir a la lista de deseos"
          >
            <FiHeart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-lg">{name}</h3>
        <h4 className="font-bold text-lg transition-opacity duration-300 group-hover:opacity-50">
          ${product.price?.toLocaleString("es-AR")}
        </h4>
      </div>
    </article>
  );
};

export default ShopCards;
