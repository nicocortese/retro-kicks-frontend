"use client";

import Link from "next/link";
import Image from "next/image";
import { FiHeart, FiX, FiTrash2 } from "react-icons/fi";
import { useShopContext } from "@/contexts/ShopContext";

const WishlistItem = ({ product, onRemove }) => {
  const { _id, name, images, price } = product;
  const primaryImage = images && images.length > 0 ? images[0] : null;

  return (
    <article className="relative group rounded-xl border border-neutral-200 shadow hover:shadow-xl transition overflow-hidden flex flex-col h-full bg-white text-black">
      <Link href={`/product/${_id}`} className="block">
        <div className="relative w-full aspect-square flex items-center justify-center overflow-hidden">
          {primaryImage ? (
            <Image
              src={`/assets/imgs/${primaryImage}`}
              alt={`Imagen de ${name}`}
              width={300}
              height={300}
              className="object-contain p-4 rounded-xl transition-all duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-center p-4 bg-gray-100 text-gray-500 font-semibold">
              No hay imagen
            </div>
          )}
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-lg">{name}</h3>
        <h4 className="font-bold text-lg mt-1">
          ${price.toLocaleString("es-AR")}
        </h4>
      </div>

      <button
        onClick={() => onRemove(_id)}
        className="absolute top-3 right-3 p-2 rounded-full bg-white text-gray-600 shadow hover:bg-[#D64541] hover:text-white transition-colors"
        aria-label="Quitar de la lista de deseos"
        type="button"
      >
        <FiX className="w-5 h-5" />
      </button>
    </article>
  );
};

const WishlistPage = () => {
  const { wishlist, handleRemoveFromWishlist, handleClearWishlist } =
    useShopContext();

  if (wishlist.length === 0) {
    return (
      <section className="max-w-[1200px] mx-auto px-4 py-24">
        <div className="text-center">
          <FiHeart className="h-16 w-16 mx-auto text-[#D64541] mb-4" />
          <h1 className="text-3xl font-bold mb-4">Tu Lista de Deseos</h1>
          <p className="text-gray-600 mb-8">
            Aquí podrás guardar tus productos favoritos
          </p>

          <div className="min-h-[300px] flex items-center justify-center">
            <div className="text-center">
              <p className="text-lg text-gray-500 mb-6">
                Tu wishlist está vacía. ¡Empezá a agregar tus productos
                favoritos!
              </p>
              <Link
                href="/shop"
                className="inline-block px-8 py-3 bg-[#D64541] text-white rounded-lg hover:bg-[#FF5B57] transition-colors font-medium"
              >
                Explorar Productos
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-[1200px] mx-auto px-4 py-24">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Tu Lista de Deseos</h1>

        {wishlist.length >= 2 && (
          <button
            onClick={handleClearWishlist}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-[#D64541] text-[#D64541] rounded-lg hover:bg-[#D64541] hover:text-white transition-colors font-medium"
            type="button"
          >
            <FiTrash2 className="w-5 h-5" />
            Vaciar Lista
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((product) => (
          <WishlistItem
            key={product._id}
            product={product}
            onRemove={handleRemoveFromWishlist}
          />
        ))}
      </div>
    </section>
  );
};

export default WishlistPage;
