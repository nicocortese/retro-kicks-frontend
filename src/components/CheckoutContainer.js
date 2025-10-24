"use client";

import React, {useEffect} from "react";
import { useShopContext } from "@/contexts/ShopContext";
import { CheckoutForm } from "./FormCheckout";
import Image from "next/image";
import { FiMinusCircle } from "react-icons/fi";
import Link from "next/link";

const CheckoutContainer = () => {
  const { cart, addOrder, cartTotal, handleRemoveFromCart } = useShopContext();

  const handleAddOrder = (values) => {
    addOrder(values);
  };


  useEffect(()=> {
    console.log("cart", cart)
    console.log("cartTotal", cartTotal())
  },[])

  return (
    <section className="max-w-[1400px] mx-auto px-6 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="col-span-1 lg:col-span-7 flex flex-col justify-center">
          <CheckoutForm handleAddOrder={handleAddOrder} />
        </div>

        <div className="col-span-1 lg:col-span-5 bg-[#ffefef] shadow-2xl rounded-2xl p-8 h-fit">
          <h2 className="text-3xl font-bold text-[#D64541] text-left mb-6 border-b border-[#d64541] pb-4">
            PEDIDO
          </h2>

          <div className="flex flex-col">
            {cart.map((product, index) => (
              <React.Fragment key={`product._id}-${product.selectedSize || index}`}>
                <div className="flex items-center gap-4 pt-4">
                  <Link href={`/product/${product._id}`}>
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden shadow-lg bg-[#ffefef]">
                    {product.images?.[0] && (
                    <Image
                      src={`/assets/imgs/${product.images?.[0]}`}
                      alt={product.name || "Producto sin nombre"}
                      fill
                      className="object-cover"
                    />
                    )}
                  </div>
                  </Link>

                  <div className="flex-1">
                    <div className="flex justify-between items-baseline gap-4">
                      <Link href={`/product/${product._id}`}>
                      <h3 className="font-semibold text-lg text-[#272626] hover:underline">
                        {product.name}
                      </h3>
                      </Link>
                      <span className="font-semibold text-lg text-[#272626] whitespace-nowrap">
                        ${(product.price * product.qty).toLocaleString("es-AR")}
                      </span>
                    </div>

                    <p className="text-sm text-[#272626]/70 mt-2">
                      Talle: {product.selectedSize} - Cantidad: {product.qty}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => handleRemoveFromCart(product)}
                    title="Eliminar producto"
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#D64541] text-white hover:bg-red-700 transition-colors duration-200 shadow-md cursor-pointer"
                  >
                    <FiMinusCircle className="h-5 w-5" />
                  </button>
                </div>

                {index < cart.length - 1 && (
                  <hr className="my-6 border-t-2 border-[#d64541]" />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t-2 border-[#d64541] space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-xl font-bold text-[#272626]">
                Total de la compra:
              </span>
              <span className="text-3xl font-bold text-[#D64541]">
                ${cartTotal().toLocaleString("es-AR")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CheckoutContainer;
