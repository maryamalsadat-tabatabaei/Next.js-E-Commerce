import { prop, getModelForClass } from "@typegoose/typegoose";
import Address from "./address";
import User from "./user";
import Product from "./product";
import type { Ref } from "@typegoose/typegoose";

class Order {
  @prop({ ref: () => Address, required: true })
  shippingInfo!: Ref<Address>;

  @prop({ ref: () => User, required: true })
  user!: Ref<User>;

  @prop({ required: true })
  orderItems!: {
    product: Ref<Product>;
    name: string;
    image: string;
    quantity: number;
    price: number;
    stock: number;
    publisher: string;
    category: string;
    author: string;
    description: string;
  }[];

  @prop({ required: true })
  paymentInfo!: {
    id: string;
    status: string;
    taxPaid: number;
    amountPaid: number;
  };

  @prop({ default: "Processing" })
  orderStatus?: string;

  @prop({ default: Date.now })
  createdAt?: Date;
}

// export const OrderModel = getModelForClass(Order);
export default Order;

// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//   shippingInfo: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: "Address",
//   },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: "User",
//   },
//   orderItems: [
//     {
//       product: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref: "Product",
//       },
//       name: {
//         type: String,
//         required: true,
//       },
//       quantity: {
//         type: String,
//         required: true,
//       },
//       image: {
//         type: String,
//         required: true,
//       },
//       price: {
//         type: String,
//         required: true,
//       },
//     },
//   ],
//   paymentInfo: {
//     id: {
//       type: String,
//       required: true,
//     },
//     status: {
//       type: String,
//       required: true,
//     },
//     taxPaid: {
//       type: Number,
//       required: true,
//     },
//     amountPaid: {
//       type: Number,
//       required: true,
//     },
//   },
//   orderStatus: {
//     type: String,
//     default: "Processing",
//   },
//   createAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// export default mongoose.models.Order || mongoose.model("Order", orderSchema);
