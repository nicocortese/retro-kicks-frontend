"use client";

import { useShopContext } from "@/contexts/ShopContext";
import { useEffect, useState } from "react";
import Image from "next/image";
import Loading from "@/components/Loading";

const ProductDetail = ({ id }) => {
  const {getOneProduct, product, handleAddToCart, loading} = useShopContext()
  const [selectedSize, setSelectedSize] = useState(null);
  const [mainImage, setMainImage] = useState("/assets/imgs/producto1.jpg");


  useEffect(() => {
    getOneProduct(id)
  }, [id, getOneProduct])

  if (loading) return <Loading />;

  const finalPrice = product.discount
    ? product.price - product.discount
    : product.price;

  const sizes = ["38", "39", "40", "41", "42", "43", "44"];

  const addToCart = (product) => {
    const productToAdd = {
      ...product,
      qty: 1,
    };
  }
    handleAddToCart(productToAdd)

    }

    const productCart = {
      _id: product._id,
      name: product.name,
      price: finalPrice,
      image: product.images[0],
      size: selectedSize,
    };


  if (loading) return <Loading />;


  return (
    <section className="max-w-[1400px] mx-auto px-6 py-20">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Galería */}
        <div className="flex-1">
          <div className="relative w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
            <Image
              src={`/assets/imgs/${product.images[0]}`}
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

        {/* Información */}
        <div className="flex-1 lg:pl-8">
          <p className="text-sm uppercase tracking-widest font-bold text-red-600 mb-2">
            {product.brand}
          </p>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-base text-gray-600 flex gap-2">
            <span className="font-medium">{product.gender}</span>
            <span>•</span>
            <span className="font-medium">{product.style}</span>
          </p>

          {/* Precio */}
          <div className="flex items-center gap-4 mt-8 pb-6 border-b border-gray-200">
            {product.discount && (
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Precio anterior</span>
                <span className="line-through text-gray-400 text-xl">
                  ${product.price}
                </span>
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Precio actual</span>
              <span className="text-4xl font-bold text-gray-900">${finalPrice}</span>
            </div>
            {product.discount && (
              <span className="ml-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                -{Math.round((product.discount / product.price) * 100)}%
              </span>
            )}
          </div>

          {/* Descripción */}
          <div className="mt-6">
            <h3 className="font-bold text-lg mb-3 text-gray-900">Descripción</h3>
            <p className="text-base leading-relaxed text-gray-700">{product.description}</p>
          </div>

          {/* Talles */}
          <div className="mt-8">
            <h3 className="font-bold text-lg mb-4 text-gray-900">Selecciona tu talle</h3>
            <div className="flex flex-wrap gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-6 py-3 rounded-lg border-2 text-base font-semibold transition-all duration-200 
                    ${
                      selectedSize === size
                        ? "bg-red-600 text-white border-red-600 shadow-lg scale-105"
                        : "bg-white hover:bg-gray-50 border-gray-300 hover:border-red-400"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Botón */}
          <button
            onClick= {(() => handleAddToCart)}
            className="mt-10 w-full px-8 py-5 rounded-xl bg-red-600 text-white font-bold text-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Agregar al carrito
          </button>

          {/* Información adicional */}
          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-3 text-sm text-gray-700">
              <svg className="w-5 h-5 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span>Envío gratis en compras mayores a $50.000</span>
            </div>
            <div className="flex items-start gap-3 text-sm text-gray-700">
              <svg className="w-5 h-5 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span>Devoluciones gratis dentro de los 30 días</span>
            </div>
            <div className="flex items-start gap-3 text-sm text-gray-700">
              <svg className="w-5 h-5 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span>Garantía de autenticidad del 100%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );


export default ProductDetail;