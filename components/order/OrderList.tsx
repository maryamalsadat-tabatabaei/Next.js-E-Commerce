"use client";
import OrderItem from "./OrderItem";
import Order from "@/interfaces/order";
import CustomPagination from "../layouts/Pagination";
import { useSearchParams, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { CartContext } from "@/context/CartContext";

interface Orders {
  orders: Order[];
  numberPerPage: number;
  ordersCount: number;
}

const OrderList = ({ orders }: { orders: Orders }) => {
  const { clearCart } = useContext(CartContext);
  const params = useSearchParams();
  const router = useRouter();

  const orderSuccess = params?.get("order_success");

  useEffect(() => {
    if (orderSuccess === "true") {
      clearCart();
      router.replace("/profile/orders");
    }
  }, []);

  return (
    <>
      <h3 className="text-xl font-semibold mb-5">Your Orders</h3>
      {orders?.orders ? (
        orders.orders?.map((order, index) => {
          return <OrderItem order={order} key={index} />;
        })
      ) : (
        <main className="flex text-lg font-semibold flex-col items-center justify-between p-24">
          There is no order yet!
        </main>
      )}

      <CustomPagination
        numberPerPage={orders?.numberPerPage}
        productsCount={orders?.ordersCount}
      />
    </>
  );
};

export default OrderList;
