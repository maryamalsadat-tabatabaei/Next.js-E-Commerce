import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState, ReactNode, useContext } from "react";
import { Types } from "mongoose";

export interface OrderContextProps {
  setUpdated: (newValue: boolean) => void;
  setDeleted: (newValue: boolean) => void;
  error: string | null;
  updated: boolean;
  deleted: boolean;
  clearErrors: () => void;
  updateOrder: (
    orderData: { orderStatus: string },
    orderId: Types.ObjectId
  ) => void;
  deleteOrder: (orderId: Types.ObjectId) => void;
}
const initialOrderContext = {
  updated: false,
  deleted: false,
  error: "",
  clearErrors: () => {},
  setUpdated: () => false,
  setDeleted: () => false,
  updateOrder: (
    orderData: { orderStatus: string },
    orderId: Types.ObjectId
  ) => {},
  deleteOrder: (orderId: Types.ObjectId) => {},
};

export const OrderContext =
  createContext<OrderContextProps>(initialOrderContext);

const OrderProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState<boolean>(false);
  const [deleted, setDeleted] = useState<boolean>(false);

  const updateOrder = async (
    orderData: { orderStatus: string },
    orderId: Types.ObjectId
  ) => {
    try {
      const { data } = await axios.put(
        `${process.env.API_URL}/api/admin/orders/${orderId}`,
        orderData
      );
      if (data) {
        setUpdated(true);
        router.replace("/admin/orders");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };
  const deleteOrder = async (orderId: Types.ObjectId) => {
    try {
      const { data } = await axios.delete(
        `${process.env.API_URL}/api/admin/orders/${orderId}`
      );
      if (data?.success) {
        setDeleted(true);
        router.replace("/admin/orders");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };
  const clearErrors = () => {
    setError(null);
  };
  return (
    <OrderContext.Provider
      value={{
        error,
        updated,
        setUpdated,
        deleted,
        setDeleted,
        clearErrors,
        deleteOrder,
        updateOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;

export const useOrderContext = () => {
  const orderContext = useContext(OrderContext);

  return orderContext;
};
