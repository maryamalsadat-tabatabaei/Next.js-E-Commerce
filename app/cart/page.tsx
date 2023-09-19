import Cart from "@/components/cart/Cart";
import axios from "axios";
import queryString from "query-string";

export const metadata = {
  title: "Cart Page",
};

export default async function CartPage() {
  return <Cart />;
}
