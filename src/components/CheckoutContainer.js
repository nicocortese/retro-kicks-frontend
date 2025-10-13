"use client";

import { useShopContext } from "@/contexts/ShopContext";
const CheckoutContainer = () => {
  const { cart } = useShopContext();

  const handlePlaceOrder = () => {
    
  }

  return (
    <section className="max-w-[1200px] my-0 mx-auto pt-20 py-3">
    <div className="grid grid-cols-12">
      <div className="col-span-6 flex justify-center items-center">
        FORM USER
        </div>
        <div className="col-span-6 flex flex-col justify-center items-start">
          <h2>PEDIDO</h2>
      {cart.map((product) => (
        <div key={product._id} className="border-8 border-solid border-red-500 p-2 w-100">
          <h3 className="pt-20 ">{product.name}</h3>
          <p className="">Cantidad: {product.qty}</p>
        </div>
      ))}
    </div>
    </div>
    </section>
  );
};

export default CheckoutContainer;
