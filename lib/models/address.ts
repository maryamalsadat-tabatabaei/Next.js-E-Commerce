import { prop, getModelForClass } from "@typegoose/typegoose";
import type { Ref } from "@typegoose/typegoose";
import User from "./user";

class Address {
  @prop({ required: true })
  street!: string;

  @prop({ required: true })
  city!: string;

  @prop({ required: true })
  state!: string;

  @prop({ required: true })
  phoneNo!: string;

  @prop({ required: true })
  zipCode!: string;

  @prop({ required: true })
  country!: string;

  @prop({ required: true })
  location!: {
    latitude: number;
    longitude: number;
  };

  @prop({ ref: () => User, required: true })
  user!: Ref<User>;

  @prop({ default: Date.now })
  createdAt!: Date;
}

export default Address;

// import mongoose from "mongoose";

// const addressSchema = new mongoose.Schema({
//   street: {
//     type: String,
//     required: true,
//   },
//   city: {
//     type: String,
//     required: true,
//   },
//   state: {
//     type: String,
//     required: true,
//   },
//   phoneNo: {
//     type: String,
//     required: true,
//   },
//   zipCode: {
//     type: String,
//     required: true,
//   },
//   country: {
//     type: String,
//     required: true,
//   },

//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: "User",
//   },

//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// export default mongoose.models.Address ||
//   mongoose.model("Address", addressSchema);
