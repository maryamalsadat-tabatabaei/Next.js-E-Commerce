"use client";

import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

const ShippingSummery = () => {
  const { cart } = useContext(CartContext);
  return (
    <aside className="md:w-1/3">
      <article className="text-gray-600" style={{ maxWidth: "350px" }}>
        <h2 className="text-lg font-semibold mb-3">Summary</h2>
        <ul>
          <li className="flex justify-between mb-1">
            <span>Amount:</span>
            <span>${cart?.checkoutInfo?.amount}</span>
          </li>
          <li className="flex justify-between mb-1">
            <span>Est TAX:</span>
            <span>${cart?.checkoutInfo?.tax}</span>
          </li>
          <li className="border-t flex justify-between mt-3 pt-3">
            <span>Total Amount:</span>
            <span className="text-gray-900 font-bold">
              ${cart?.checkoutInfo?.totalAmount}
            </span>
          </li>
        </ul>

        <hr className="my-4" />

        <h2 className="text-lg font-semibold mb-3">Items in cart</h2>

        {cart?.cartItems?.map((item, index) => (
          <figure className="flex items-center mb-4 leading-5" key={index}>
            <div>
              <div className="block relative w-20 h-20 rounded p-1 border border-gray-200">
                <img className="50" height="50" src={item.image} alt="Title" />
                <span className="absolute -top-2 -right-2 w-6 h-6 text-sm text-center flex items-center justify-center text-white bg-gray-400 rounded-full">
                  {item.quantity}
                </span>
              </div>
            </div>
            <figcaption className="ml-3">
              <p>{item.name.substring(0, 50)}</p>
              <p className="mt-1 text-gray-400">
                Total: ${item.quantity * item.price}
              </p>
            </figcaption>
          </figure>
        ))}
      </article>
    </aside>
  );
};

export default ShippingSummery;
