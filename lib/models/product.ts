import { prop, getModelForClass, mongoose } from "@typegoose/typegoose";
import User from "./user";
import type { Ref } from "@typegoose/typegoose";

class Review {
  @prop({ ref: () => User, required: true })
  user!: Ref<User>;

  @prop({ required: true })
  rating!: number;

  @prop({ required: true })
  comment!: string;

  @prop({ default: Date.now })
  createdAt?: Date;
}

class Product {
  @prop({ required: true })
  name!: string;

  @prop({ required: true })
  description!: string;

  @prop({ required: true })
  author!: string;

  @prop({ required: true })
  price!: number;

  @prop({ _id: false, type: mongoose.Schema.Types.Mixed })
  images!: {
    public_id?: string;
    url?: string;
  }[];

  @prop({
    required: true,
    enum: [
      "Fiction",
      "Biography/Autobiography",
      "Science",
      "Fantasy",
      "Psychology",
      "Self-Help",
      "Mystery/Thriller",
      "Romance",
      "History",
    ],
  })
  category!: string;

  @prop({ required: true })
  seller!: string;

  @prop({ required: true })
  publisher!: string;

  @prop({ required: true })
  stock!: number;

  @prop({ default: 0 })
  ratings?: number;

  @prop({ type: () => Review })
  reviews!: Review[];

  @prop({ ref: User })
  user?: Ref<User>;

  @prop({ default: Date.now })
  createdAt?: Date;
}

export default Product;

// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Please enter book name"],
//   },
//   description: {
//     type: String,
//     required: [true, "Please enter book description"],
//   },
//   author: {
//     type: String,
//     required: [true, "Please enter book author"],
//   },
//   price: {
//     type: Number,
//     required: [true, "Please enter book price"],
//   },
//   images: [
//     {
//       public_id: {
//         type: String,
//       },
//       url: {
//         type: String,
//       },
//     },
//   ],
//   category: {
//     type: String,
//     required: [true, "Please enter book category"],
//     enum: {
//       values: [
//         "Fiction",
//         "Biography/Autobiography",
//         "Science",
//         "Fantasy",
//         "Psychology",
//         "Self-Help",
//         "Mystery/Thriller",
//         "Romance",
//         "History",
//       ],
//       message: "Please select correct category",
//     },
//   },
//   seller: {
//     type: String,
//     required: [true, "Please enter book seller"],
//   },
//   publisher: {
//     type: String,
//     required: [true, "Please enter book publisher"],
//   },
//   stock: {
//     type: Number,
//     required: [true, "Please enter book stock"],
//   },
//   ratings: {
//     type: Number,
//     default: 0,
//   },
//   reviews: [
//     {
//       user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true,
//       },
//       rating: {
//         type: Number,
//         required: true,
//       },
//       comment: {
//         type: String,
//         required: true,
//       },
//       createdAt: {
//         type: Date,
//         default: Date.now,
//       },
//     },
//   ],
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: false,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// export default mongoose.models.Product ||
//   mongoose.model("Product", productSchema);
