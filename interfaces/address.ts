import User from "./user";
import { Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";

interface Address {
  _id?: Types.ObjectId;
  street: string;
  city: string;
  state: string;
  phoneNo: string;
  zipCode: string;
  country: string;
  user: Ref<User>;
  createdAt?: Date;
}

export interface FormAddress {
  street: string;
  city: string;
  state: string;
  phoneNo: string;
  zipCode: string;
  country: string;
  createdAt?: Date;
}

export default Address;
