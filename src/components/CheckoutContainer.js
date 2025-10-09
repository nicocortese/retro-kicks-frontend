"use client";

import { useShopContext } from "@/contexts/ShopContext";
const CheckoutContainer = () => {
  const { cart } = useShopContext();

  console.log(cart); // 👈 Agregalo acá


  return (
    <div>
      {cart.map((product) => (
        <div key={product._id}>
          <h3 className="pt-20">{product.name}</h3>
          <p className="">Cantidad: {product.qty}</p>
        </div>
      ))}
    </div>
  );
};

export default CheckoutContainer;
