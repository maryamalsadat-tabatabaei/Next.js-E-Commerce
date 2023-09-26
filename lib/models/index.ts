import User from "./user";
import Product from "./product";
import Address from "./address";
import Order from "./order";
import { getModelForClass } from "@typegoose/typegoose";

export const ProductModel = getModelForClass(Product);
export const UserModel = getModelForClass(User);
export const AddressModel = getModelForClass(Address);
export const OrderModel = getModelForClass(Order);
