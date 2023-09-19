import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import CartItem from "@/interfaces/cart";

export interface CartContextProps {
  cart: { cartItems?: CartItem[] };
  addItemToCart: (product: CartItem) => void;
  deleteItemFromCart: (productId: string) => void;
  clearCart: () => void;
}
const initialCartContext = {
  cart: { cartItems: [] },
  addItemToCart: (product: CartItem) => {},
  deleteItemFromCart: (productId: string) => {},
  clearCart: () => {},
};
// export const CartContext = createContext<CartContextProps | null>(null);
export const CartContext = createContext<CartContextProps>(initialCartContext);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<{ cartItems?: CartItem[] }>({
    cartItems: [],
  });

  useEffect(() => {
    setCartFromStorageToState();
  }, []);

  const setCartFromStorageToState = () => {
    const cartFromStorage = localStorage.getItem("cart");
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
      "cart",
      JSON.stringify({ cartItems: updateCartItems })
    );
    setCartFromStorageToState();
  };
  const deleteItemFromCart = (productId: string) => {
    const updateCartItems = cart?.cartItems?.filter(
      (item: CartItem) => item.productId !== productId
    );
    localStorage.setItem(
      "cart",
      JSON.stringify({ cartItems: updateCartItems })
    );
    setCartFromStorageToState();
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
