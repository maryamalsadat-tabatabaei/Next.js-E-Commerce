"use client";
import Link from "next/link";
import CartItem from "./CartItem";
import CartTotal from "./CartTotal";
import { CartContext } from "@/context/CartContext";
import { useContext } from "react";

const Cart = () => {
  const { cart } = useContext(CartContext);

  return (
    <>
      <section className="py-5 sm:py-7 bg-blue-100">
        <div className="container max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-2">
            {cart?.cartItems?.length || 0} Item(s) in Cart
          </h2>
        </div>
      </section>

      <section className="py-10">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            {cart?.cartItems?.length ? (
              <>
                <main className="md:w-3/4">
                  <CartItem />
                </main>

                <CartTotal />
              </>
            ) : (
              <div className="flex flex-col gap-4 mx-auto text-base font-semibold ">
                There is no item in the cart
                <Link
                  href={"/"}
                  className="px-4 py-2 inline-block border border-transparent bg-blue-600 text-white text-center rounded-md hover:bg-blue-700"
                >
                  Back Home
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
