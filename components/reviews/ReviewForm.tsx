import { AuthContext } from "@/context/AuthContext";
import { ProductContext } from "@/context/ProductContext";
import Product from "@/interfaces/product";
import { useContext, useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { toast } from "react-toastify";
import { getUserReview } from "@/helpers/getUserReview";
import { Types } from "mongoose";
import User from "@/interfaces/user";

interface UserReview {
  rating: number;
  comment: string;
}

const ReviewForm = ({ product }: { product: Product }) => {
  const { createReview, error, clearErrors } = useContext(ProductContext);
  const { user } = useContext(AuthContext);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const userReview = getUserReview(
      product?.reviews,
      user?._id as Types.ObjectId
    );

    if (userReview) {
      setRating(userReview?.rating);
      setComment(userReview?.comment);
    }

    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error, user, clearErrors, product?.reviews]);

  const submitHandler = () => {
    const reviewData = { rating, comment, productId: product?._id };
    createReview(reviewData);
  };
  return (
    <div className="mx-auto px-4 md:w-1/2 lg:w-1/3">
      <hr className="my-4" />
      <h1 className="text-gray-500 review-title my-5 text-2xl text-center">
        Your Review
      </h1>

      <h3 className="text-center">Rating</h3>
      <div className="mb-4 mt-3 flex justify-center">
        <div className="ratings">
          <StarRatings
            rating={rating}
            starRatedColor="#ffb829"
            numberOfStars={5}
            name="rating"
            value={rating}
            changeRating={(e: any) => setRating(e)}
          />
        </div>
      </div>
      <div className="mb-4 mt-5">
        <label className="block mb-1 text-center">Comments</label>
        <textarea
          rows={4}
          className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
          placeholder="Your review"
          name="Comment"
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>

      <button
        onClick={submitHandler}
        className="mt-3 mb-5  px-4 py-2 text-center inline-block text-white bg-yellow-500 border border-transparent rounded-md hover:bg-yellow-600 w-full "
      >
        Post Review
      </button>
    </div>
  );
};

export default ReviewForm;
