"use client";
import { FiHeart } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { useShopContext } from "@/contexts/ShopContext";

const ShopCards = ({ product }) => {
  const { _id, name, images } = product;

  const { handleToggleWishlist, isProductInWishlist } = useShopContext();

  const primaryImage = images && images.length > 0 ? images[0] : null;

  const inWishlist = isProductInWishlist(_id);

  const handleWishlistClick = (e) => {
    e.stopPropagation(); // evita que el clic vaya hacia elementos padres
    e.preventDefault(); // previene la acción por defecto del navegador para este clic
    handleToggleWishlist(product); // ahora que hemos "frenado" el link, ejecutamos la única acción
  };

  return (
    <Link
      href={`/product/${product._id}`}
      className="block h-full group"
      aria-label={`Ver detalles de ${name}`}
    >
      <article
        className="relative rounded-xl border border-neutral-800 shadow hover:shadow-xl transition overflow-hidden flex flex-col h-full"
        style={{
          backgroundColor: "rgb(var(--card-bg-rgb))",
          color: "rgb(var(--card-text-rgb))",
        }}
      >
        <div className="relative w-full aspect-square flex items-center justify-center overflow-hidden">
          {primaryImage ? (
            <Image
              src={`/assets/imgs/${primaryImage}`}
              alt={`Imagen de ${name}`}
              width={400}
              height={400}
              className="object-contain p-4 rounded-xl transition-all duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-center p-4 bg-[#ffefef] text-[#272626]/70 font-semibold">
              No hay imagen disponible.
            </div>
          )}

          <button
            onClick={handleWishlistClick}
            className={`absolute top-3 right-3 p-3 rounded-full transition-colors ${
              inWishlist
                ? "bg-[#D64541] text-[#ffefef]"
                : "bg-[#272626]/70 text-[#ffefef]"
            }`}
            aria-label={
              inWishlist
                ? "Quitar de la lista de deseos"
                : "Añadir a la lista de deseos"
            }
          >
            <FiHeart
              className="w-5 h-5 cursor-pointer"
              style={{ fill: inWishlist ? "currentColor" : "none" }}
            />
          </button>
        </div>

        <div className="p-4 flex flex-col flex-1">
          <h1 className="font-semibold text-lg text-[#272626]">{name}</h1>
          <h4 className="font-bold text-lg">
            ${product.price?.toLocaleString("es-AR")}
          </h4>
        </div>
      </article>
    </Link>
  );
};

export default ShopCards;
