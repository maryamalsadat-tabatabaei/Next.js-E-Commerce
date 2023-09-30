import User from "@/interfaces/user";
import { Types } from "mongoose";
interface Review {
  user: User;
  rating: number;
  comment: string;
}
export const getUserReview = (reviews: Review[], userId: Types.ObjectId) => {
  let userReview = null;

  reviews.forEach((review) => {
    if (review?.user?._id === userId) {
      userReview = review;
    }
  });

  return userReview;
};
