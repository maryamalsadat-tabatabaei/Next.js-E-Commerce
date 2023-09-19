import User from "./user";
import Product from "./product";
import { getModelForClass } from "@typegoose/typegoose";

export const ProductModel = getModelForClass(Product);
export const UserModel = getModelForClass(User);
