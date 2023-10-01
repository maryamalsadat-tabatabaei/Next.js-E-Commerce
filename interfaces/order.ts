import { Document, Types } from "mongoose";
import Product from "./product";
import User from "./user";
import Address from "./address";

export interface OrderItem {
  product: Types.ObjectId | Product;
  name: string;
  image: string;
  quantity: number;
  price: number;
  stock: number;
  publisher: string;
  category: string;
  author: string;
  description: string;
}

interface PaymentInfo {
  id: string;
  status: string;
  taxPaid: number;
  amountPaid: number;
}

interface Order extends Document {
  shippingInfo: Address;
  user: User;
  orderItems: OrderItem[];
  paymentInfo: PaymentInfo;
  orderStatus: string;
  createdAt: Date;
}

export default Order;
