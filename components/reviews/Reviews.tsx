import { formatDate } from "@/helpers/formatDate";
import User from "@/interfaces/user";
import StarRatings from "react-star-ratings";
import CustomPagination from "../layouts/Pagination";
import Image from "next/image";

interface Review {
  user: User;
  rating: number;
  comment?: string;
  createdAt: Date;
}

const Reviews = ({
  reviews,
  numberPerPage,
  reviewsCount,
}: {
  reviews: Review[];
  reviewsCount: number;
  numberPerPage: number;
}) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews?.map((review) => (
          <article
            key={review?.createdAt.toString()}
            className="block p-6 bg-white max-w-sm rounded-lg border border-gray-200 shadow-md mb-5"
          >
            <div className="flex items-center mb-4 space-x-4">
              <Image
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
                src={
                  review?.user?.avatar
                    ? (review?.user?.avatar?.url as string)
                    : "/images/default.png"
                }
                alt="user avatar"
              />
              <div className="space-y-1 font-medium">
                <p>
                  {review?.user?.name}
                  <time className="block text-sm text-gray-500 dark:text-gray-400">
                    Posted on: {formatDate(review?.createdAt?.toString())}
                  </time>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center space-x-2 mb-2">
              <div className="ratings">
                <StarRatings
                  rating={review?.rating}
                  starRatedColor="#ffb829"
                  numberOfStars={5}
                  starDimension="18px"
                  starSpacing="1px"
                  name="rating"
                />
              </div>
              <span className="text-yellow-500">{review?.rating}</span>
            </div>

            <p className="mb-2 font-light text-gray-500 dark:text-gray-400 text-xl">
              {review?.comment}
            </p>
          </article>
        ))}
      </div>
      {reviewsCount > numberPerPage && (
        <div className="mb-4 ">
          <CustomPagination
            numberPerPage={numberPerPage}
            productsCount={reviewsCount}
          />
        </div>
      )}
    </>
  );
};

export default Reviews;
