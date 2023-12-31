"use client";
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { CheckoutInformation, CartItem } from "@/interfaces/cart";
import { useRouter } from "next/navigation";
import { Types } from "mongoose";
import User from "@/interfaces/user";
import { AuthContext } from "./AuthContext";
import { useSession } from "next-auth/react";

export interface CartContextProps {
  cart: {
    cartItems?: CartItem[];
    checkoutInfo?: CheckoutInformation;
  };
  addItemToCart: (product: CartItem) => void;
  deleteItemFromCart: (productId: Types.ObjectId) => void;
  clearCart: () => void;
  saveOnCheckout: (checkoutInfo: CheckoutInformation) => void;
}
const initialCartContext = {
  cart: { cartItems: [] },
  addItemToCart: (product: CartItem) => {},
  deleteItemFromCart: (productId: Types.ObjectId) => {},
  clearCart: () => {},
  saveOnCheckout: (checkoutInfo: CheckoutInformation) => {},
};
// export const CartContext = createContext<CartContextProps | null>(null);
export const CartContext = createContext<CartContextProps>(initialCartContext);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user, setUser } = useContext(AuthContext);
  const { data } = useSession();

  useEffect(() => {
    if (data) {
      setUser(data?.user as User | null);
    }
    setCartFromStorageToState();
  }, [data, setUser]);

  const router = useRouter();
  const [cart, setCart] = useState<{ cartItems?: CartItem[] }>({
    cartItems: [],
  });

  const setCartFromStorageToState = () => {
    const cartFromStorage = localStorage.getItem(
      `cartItems_${user?._id || "unknown"}`
    );
    setCart(cartFromStorage ? JSON.parse(cartFromStorage) : { cartItems: [] });
  };

  const addItemToCart = async ({ ...product }: CartItem) => {
    const isItemExist = cart?.cartItems?.find(
      (item: CartItem) => item.productId === product.productId
    );
    let updateCartItems;
    if (isItemExist) {
      updateCartItems = cart?.cartItems?.map((item) =>
        item.productId === isItemExist.productId ? product : item
      );
    } else {
      updateCartItems = [...(cart?.cartItems || []), product];
    }

    localStorage.setItem(
      `cartItems_${user?._id || "unknown"}`,
      JSON.stringify({ cartItems: updateCartItems })
    );

    setCartFromStorageToState();
  };
  const deleteItemFromCart = (productId: Types.ObjectId) => {
    const updateCartItems = cart?.cartItems?.filter(
      (item: CartItem) => item.productId !== productId
    );
    localStorage.setItem(
      `cartItems_${user?._id || "unknown"}`,
      JSON.stringify({ cartItems: updateCartItems })
    );
    setCartFromStorageToState();
  };
  const saveOnCheckout = (checkoutInfo: CheckoutInformation) => {
    const newCart = { ...cart, checkoutInfo };
    localStorage.setItem(
      `cartItems_${user?._id || "unknown"}`,
      JSON.stringify(newCart)
    );
    setCartFromStorageToState();
    router.push("/shipping");
  };
  const clearCart = () => {
    localStorage.removeItem("cart");
    setCartFromStorageToState();
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        deleteItemFromCart,
        clearCart,
        saveOnCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCartContext = () => {
  const cartContext = useContext(CartContext);

  return cartContext;
};
