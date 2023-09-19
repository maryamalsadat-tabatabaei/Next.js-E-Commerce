"use client";
import Link from "next/link";
import { CartContext } from "@/context/CartContext";
import { useContext } from "react";
import CartItem from "@/interfaces/cart";

const CartItem = () => {
  const { cart, deleteItemFromCart, addItemToCart } = useContext(CartContext);

  const increaseQty = (cartItem: CartItem) => {
    const newQty = cartItem?.quantity + 1;
    const updateCartItem = { ...cartItem, quantity: newQty };
    if (newQty > Number(cartItem.stock)) return;

    addItemToCart(updateCartItem);
  };

  const decreaseQty = (cartItem: CartItem) => {
    const newQty = cartItem?.quantity - 1;
    const updateCartItem = { ...cartItem, quantity: newQty };
    if (newQty <= 0) return;

    addItemToCart(updateCartItem);
  };

  return (
    <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
      {cart?.cartItems?.map((cartItem, index) => (
        <div>
          <div className="flex flex-wrap lg:flex-row gap-5 mb-4">
            <div className="w-full lg:w-2/5 xl:w-2/4">
              <figure className="flex leading-5">
                <div>
                  <div className="block w-16 h-16 rounded border border-gray-200 overflow-hidden">
                    <img
                      src={cartItem.image || "/images/default_product.png"}
                      alt={cartItem.name}
                    />
                  </div>
                </div>
                <figcaption className="ml-3">
                  <p>
                    <Link
                      href={`product/${cartItem.productId}`}
                      className="hover:text-blue-600"
                    >
                      {cartItem.name}
                    </Link>
                  </p>
                  <p className="mt-1 text-gray-400">
                    {" "}
                    Seller: {cartItem.seller}
                  </p>
                </figcaption>
              </figure>
            </div>
            <div className="w-24">
              <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                <button
                  onClick={() => decreaseQty(cartItem)}
                  data-action="decrement"
                  className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                >
                  <span className="m-auto text-2xl font-thin">−</span>
                </button>
                <input
                  type="number"
                  className="focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-900  outline-none custom-input-number"
                  name="custom-input-number"
                  value={cartItem.quantity}
                  readOnly
                ></input>
                <button
                  onClick={() => increaseQty(cartItem)}
                  data-action="increment"
                  className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                >
                  <span className="m-auto text-2xl font-thin">+</span>
                </button>
              </div>
            </div>
            <div>
              <div className="leading-5">
                <p className="font-semibold not-italic">
                  ${(cartItem.price * cartItem.quantity).toFixed(2)}
                </p>
                <small className="text-gray-400">
                  {" "}
                  $ {cartItem.price}/ per item{" "}
                </small>
              </div>
            </div>
            <div className="flex-auto">
              <div className="float-right">
                <a
                  onClick={() => deleteItemFromCart(cartItem?.productId)}
                  className="px-4 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                >
                  Remove
                </a>
              </div>
            </div>
          </div>
          {cart?.cartItems && cart?.cartItems?.length - 1 !== index && (
            <hr className="my-4" />
          )}
        </div>
      ))}
    </article>
  );
};

export default CartItem;
