import User from "./user";
import { Ref } from "@typegoose/typegoose";

interface Address {
  _id?: string;
  street: string;
  city: string;
  state: string;
  phoneNo: string;
  zipCode: string;
  country: string;
  user: Ref<User>;
  createdAt?: Date;
}

export default Address;
