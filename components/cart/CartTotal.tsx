"use client";
import Link from "next/link";
import { CartContext } from "@/context/CartContext";
import { useContext } from "react";

const CartTotal = () => {
  const { cart, saveOnCheckout } = useContext(CartContext);

  const totalPriceWithoutTax =
    cart?.cartItems?.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    ) || 0;

  const tax = (totalPriceWithoutTax * 0.15).toFixed(2);

  const totalUnits =
    cart?.cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const totalPriceWithTax = (
    Number(totalPriceWithoutTax) + Number(tax)
  ).toFixed(2);

  const checkoutHandler = () => {
    const checkoutInfo = {
      amount: totalPriceWithoutTax,
      totalAmount: Number(totalPriceWithTax),
      tax: Number(tax),
      totalUnits,
    };
    saveOnCheckout(checkoutInfo);
  };
  return (
    <aside className="md:w-1/4">
      <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
        <ul className="mb-5">
          <li className="flex justify-between text-gray-600  mb-1">
            <span>Total price:</span>
            <span>${Number(totalPriceWithoutTax).toFixed()}</span>
          </li>
          <li className="flex justify-between text-gray-600  mb-1">
            <span>Total Units:</span>
            <span className="text-green-500">{totalUnits} (Units)</span>
          </li>
          <li className="flex justify-between text-gray-600  mb-1">
            <span>TAX:</span>
            <span>${tax}</span>
          </li>
          <li className="text-lg font-bold border-t flex justify-between mt-3 pt-3">
            <span>Total price:</span>
            <span>${totalPriceWithTax}</span>
          </li>
        </ul>

        <a
          onClick={checkoutHandler}
          className="px-4 py-3 mb-2 inline-block text-lg w-full text-center font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 cursor-pointer"
        >
          Continue
        </a>

        <Link
          href="/"
          className="px-4 py-3 inline-block text-lg w-full text-center font-medium text-green-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100"
        >
          Back to shop
        </Link>
      </article>
    </aside>
  );
};

export default CartTotal;
