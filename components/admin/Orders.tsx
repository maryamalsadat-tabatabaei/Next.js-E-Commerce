"use client";
import Link from "next/link";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import CustomPagination from "../layouts/Pagination";
import Order from "@/interfaces/order";
import { Types } from "mongoose";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { OrderContext } from "@/context/OrderContext";

interface OrdersType {
  orders: Order[];
  numberPerPage: number;
  ordersCount: number;
}
const Orders = ({ orders }: { orders: OrdersType }) => {
  const { error, clearErrors, deleteOrder, deleted, setDeleted } =
    useContext(OrderContext);
  useEffect(() => {
    if (deleted) {
      toast.success("Order Deleted");
      setDeleted(false);
    }
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error, deleted, clearErrors, setDeleted]);
  const deleteHandler = (orderId: Types.ObjectId) => {
    deleteOrder(orderId);
  };
  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg">
      <h1 className="text-3xl my-5 ml-4 font-bold">
        {orders?.ordersCount} Orders
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left whitespace-no-wrap">
          <thead className="text-l text-gray-700 uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Amount Paid
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.orders?.map((order) => (
              <tr className="bg-white" key={order?._id.toString()}>
                <td className="px-6 py-2">{order._id}</td>
                <td className="px-6 py-2">${order?.paymentInfo?.amountPaid}</td>
                <td className="px-6 py-2">{order?.orderStatus}</td>
                <td className="px-6 py-2">
                  <div className="flex">
                    <Link
                      href={`/admin/orders/${order?._id}`}
                      className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                    >
                      <FaPencilAlt />
                    </Link>
                    <a
                      onClick={() => deleteHandler(order?._id)}
                      className="px-2 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                    >
                      <FaTrash />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {orders?.ordersCount > orders?.numberPerPage && (
        <div className="mb-4">
          <CustomPagination
            numberPerPage={orders?.numberPerPage}
            productsCount={orders?.ordersCount}
          />
        </div>
      )}
    </div>
  );
};

export default Orders;
