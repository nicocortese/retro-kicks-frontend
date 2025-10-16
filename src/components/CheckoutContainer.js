"use client";

import { useShopContext } from "@/contexts/ShopContext";
import { CheckoutForm } from "./FormCheckout";
const CheckoutContainer = () => {
  const { cart, addOrder } = useShopContext();

  const handlePlacerOrder = () => {
    console.log("mi orden");
  };

  const handleAddOrder = (values) => {
  addOrder(values);
};

  return (
    <section className="max-w-[1200px] my-0 mx-auto py-30">
      <div className="grid grid-cols-12">
        <div className="col-span-6 flex flex-col justify-center items-start">
          <CheckoutForm handleAddOrder={handleAddOrder} />
        </div>
        <div className="col-span-6">
          <h2>PEDIDO</h2>
          <div>
            {cart.map((product) => (
              <div
                key={product._id}
                className="border-4 border-solid border-red-400 p-2 m-2 w-100"
              >
                <h3>{product.name}</h3>
                <p>Cantidad: {product.qty}</p>
              </div>
            ))}
          </div>
          <button onClick={() => handlePlacerOrder()}>Place Order</button>
        </div>
      </div>
    </section>
  )
};
export default CheckoutContainer;
