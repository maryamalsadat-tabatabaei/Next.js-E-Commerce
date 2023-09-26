import { Document, Types } from "mongoose";

export type CartItem = {
  productId: Types.ObjectId;
  name: string;
  price: number;
  image: string;
  seller: string;
  stock: number;
  quantity: number;
  publisher: string;
  category: string;
  author: string;
  description: string;
};

export type CheckoutInformation = {
  amount: number;
  totalAmount: number;
  tax: number;
  totalUnits: number;
};
