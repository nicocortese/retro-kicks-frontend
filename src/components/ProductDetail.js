"use client";

import { useShopContext } from "@/contexts/ShopContext";
import { useEffect, useState } from "react";
import Image from "next/image";
import Loading from "@/components/Loading";

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

  const finalPrice = product.discount
    ? product.price - product.discount
    : product.price;

  const primaryImage = product.images?.[0] || null;

  const handleImageHover = (img) => setMainImage(img);

  const addToCart = (product) => {
    const productToAdd = {
      ...product,
      qty: 1,
    };
    handleAddToCart(productToAdd);
  };

  return (
    <section className="max-w-[1400px] mx-auto px-6 py-20">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Columna Izquierda: Galería */}
        <div className="flex-1">
          <div className="relative w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
            <Image
              src={`/assets/imgs/${mainImage || primaryImage}`}
              alt={product.name || "productos"}
              fill
              className="object-contain p-8"
            />
          </div>

          <div className="flex gap-4 mt-6">
            {product.images?.map((img, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setMainImage(img)}
                className={`relative w-28 h-28 rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-200 shadow-md hover:shadow-lg
                  ${
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
        </div>

        {/* Columna Derecha: Aquí irá la información */}
        <div className="flex-1 lg:pl-8">
          <p>Columna de Información (Prueba)</p>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;