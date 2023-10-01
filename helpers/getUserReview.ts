import User from "@/interfaces/user";
import { Types } from "mongoose";
interface Review {
  user: User;
  rating: number;
  comment: string;
}
export const getUserReview = (reviews: Review[], userId: Types.ObjectId) => {
  let userReview = {
    comment: "",
    rating: 0,
  };

  reviews.forEach((review) => {
    if (review?.user?._id === userId) {
      userReview.comment = review.comment;
      userReview.rating = review.rating;
    }
  });

  return userReview;
};
