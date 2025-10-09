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

  // Por ahora, solo devolvemos el return simple que sabemos que funciona
  return (
    <div>
      <h1>Página de Detalle de Producto</h1>
      <p>Toda la lógica de arriba se ha cargado correctamente.</p>
    </div>
  );
};

export default ProductDetail;