"use client";

import { useShopContext } from "@/contexts/ShopContext";
import { useEffect, useState } from "react";
import Image from "next/image";
import Loading from "@/components/Loading";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const ProductDetail = ({ id }) => {
  const { getOneProduct, product, handleAddToCart, loading } = useShopContext();
  const [selectedSize, setSelectedSize] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    getOneProduct(id);
  }, [id, getOneProduct]);

  if (loading || !product?._id) {
    return <Loading />;
  }

  const primaryImage = product.images?.[0] || null;

  const addToCart = () => {
    console.log("product", product)
    if (!selectedSize) {
      alert("Debes elegir un talle para agregar al carrito.");
      return;
    }
    const productToAdd = {
      ...product,
      qty: 1,
      selectedSize,
      uniqueId: `${product._id}-${selectedSize}`,
    };
    handleAddToCart(productToAdd);
  };

  const handleSize = (size) => {
    if (selectedSize === size) {
      setSelectedSize(null);
    } else {
  setSelectedSize(size)
};
}

  return (
    <section className="max-w-[1400px] mx-auto px-6 py-20">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* IZQUIERDA */}
        <div className="flex-1">
          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={`/assets/imgs/${mainImage || primaryImage}`}
              alt={product.name || "productos"}
              fill
              className="object-contain p-8"
            />
          </div>

          {/* DESCRIPCIÓN */}
          <div className="mt-10">
            <h3 className="font-bold text-lg mb-3 text-gray-900">
              Descripción
            </h3>
            <p className="text-base leading-relaxed text-gray-700">
              {product.description}
            </p>
          </div>

          {/* INFO */}
          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-3 text-sm text-gray-700">
              <svg
                className="w-5 h-5 text-green-600 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Envío gratis en compras mayores a $200.000</span>
            </div>
            <div className="flex items-start gap-3 text-sm text-gray-700">
              <svg
                className="w-5 h-5 text-green-600 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Devoluciones gratis dentro de los 30 días</span>
            </div>
            <div className="flex items-start gap-3 text-sm text-gray-700">
              <svg
                className="w-5 h-5 text-green-600 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Garantía de autenticidad del 100%</span>
            </div>
          </div>
        </div>

        {/* DERECHA */}
        <div className="flex-1 lg:pl-8">
          <p className="text-sm uppercase tracking-widest font-bold text-[#D64541] mb-2">
            {product.brand}
          </p>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {product.name}
          </h1>
          <p className="text-base text-gray-600 flex gap-2">
            <span className="font-medium">{product.gender}</span>
            <span>•</span>
            <span className="font-medium">{product.style}</span>
          </p>
          {/* PRECIO */}
          <div className="mt-8 pb-6 border-b border-gray-200">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Precio</span>
              <span className="text-4xl font-bold text-gray-900">
                ${product.price?.toLocaleString("es-AR")}
              </span>
            </div>
          </div>
          {/* TALLES */}
          <div className="mt-6">
            <h3 className="font-semibold mb-3 text-gray-900">
              Seleccioná tu talle
            </h3>
            <div className="flex flex-wrap gap-3">
              {product.sizes?.map((size) => {
                const stock = product.stockBySize?.[size] || 0;
                const disabled = stock <= 0;
                return (
                  <button
                    key={size}
                    disabled={disabled}
                    onClick={() => !disabled && handleSize(size)}
                    className={`px-5 py-2 rounded-lg border-2 font-semibold cursor-pointer transition ${
                      selectedSize === size
                        ? "bg-[#D64541] text-white border-[#D64541]"
                        : "bg-white hover:bg-gray-50 border-gray-300 hover:border-[#D64541]"
                    } ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
          {/* BOTÓN */}
          <button
            onClick={() => addToCart()}
            className="mt-10 w-full px-8 py-5 rounded-xl bg-[#D64541] text-white font-bold text-lg hover:bg-[#FF5B57] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
          >
            Agregar al carrito
          </button>

          

          {/* GALERÍA */}
          <div className="flex gap-4 mt-10">
            {product.images?.map((img, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setMainImage(img)}
                className={`relative w-28 h-28 rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-200 shadow-md hover:shadow-lg ${
                  (mainImage || product.images[0]) === img
                    ? "border-red-500 scale-105"
                    : "border-gray-300 hover:border-red-400"
                }`}
              >
                <Image
                  src={`/assets/imgs/${img}`}
                  alt={`${product.name}-${idx}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
            
          </div>
          <div className="mt-10">
            <h3 className="font-semibold text-2xl mb-3 text-[#272626]">
              Valoración
            </h3>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((starValue) => {
                const roundedRating = Math.round(product.rating * 2) / 2;

                if (starValue <= roundedRating) {
                  return (
                    <FaStar
                      key={starValue}
                      className="text-yellow-500 h-5 w-5"
                    />
                  );
                } else if (starValue - 0.5 === roundedRating) {
                  return (
                    <FaStarHalfAlt
                      key={starValue}
                      className="text-yellow-500 h-5 w-5"
                    />
                  );
                } else {
                  return (
                    <FaRegStar
                      key={starValue}
                      className="text-yellow-500 h-5 w-5"
                    />
                  );
                }
              })}
              <span className="ml-2 text-sm text-[#272626]">
                {product.rating?.toFixed(1)} de 5
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
