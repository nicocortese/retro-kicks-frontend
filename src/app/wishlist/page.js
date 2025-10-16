"use client";

import Link from "next/link";
import { FiHeart } from "react-icons/fi";

const WishlistPage = () => {
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
              Tu wishlist está vacía. ¡Empezá a agregar tus productos favoritos!
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-[#D64541] text-white rounded-lg hover:bg-[#FF5B57] transition-colors font-medium"
            >
              Explorar Productos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WishlistPage;
