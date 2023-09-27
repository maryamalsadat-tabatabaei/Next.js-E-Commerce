import { Document, Types } from "mongoose";
interface Product {
  _id: Types.ObjectId;
  name: string;
  description: string;
  author: string;
  price: number;
  images: Array<{
    public_id: string;
    url: string;
  }>;
  category:
    | "Fiction"
    | "Biography/Autobiography"
    | "Science"
    | "Fantasy"
    | "Psychology"
    | "Self-Help"
    | "Mystery/Thriller"
    | "Romance"
    | "History";
  seller: string;
  publisher: string;
  stock: number;
  ratings: number;
  reviews: Array<{
    user: string;
    rating: number;
    comment: string;
    createdAt: Date;
  }>;
  user?: string;
  createdAt: Date;
}

export default Product;

export interface ProductForm {
  name: string;
  description: string;
  author: string;
  price: number;
  // images: Array<{
  //   public_id: string;
  //   url: string;
  // }>;
  category:
    | "Fiction"
    | "Biography/Autobiography"
    | "Science"
    | "Fantasy"
    | "Psychology"
    | "Self-Help"
    | "Mystery/Thriller"
    | "Romance"
    | "History";
  seller: string;
  publisher: string;
  stock: number;
}
