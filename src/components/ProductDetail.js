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
        {/* Columna Izquierda: Aquí irá la galería */}
        <div className="flex-1">
          <p>Columna de Galería (Prueba)</p>
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