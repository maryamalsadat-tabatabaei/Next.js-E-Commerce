"use client";

import StarRatings from "react-star-ratings";
import Product from "@/interfaces/product";
import BreadCrumbs from "../layouts/BreadCrumbs";
import Image from "next/image";
import { useRef, useContext, useEffect } from "react";
import { CartContext } from "@/context/CartContext";
import ReviewForm from "../reviews/ReviewForm";
import { FaShoppingBag, FaShoppingCart } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { OrderContext } from "@/context/OrderContext";
import Reviews from "../reviews/Reviews";

const ProductDetail = ({
  product,
  reviewsCount,
  numberPerPage,
}: {
  product: Product;
  reviewsCount: number;
  numberPerPage: number;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSale = searchParams?.get("onSale") || false;

  const { addItemToCart } = useContext(CartContext);
  const { canUserRivew, canReview } = useContext(OrderContext);

  const inStock = product?.stock >= 1;
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    canUserRivew(product?._id);
  }, [canUserRivew, product?._id]);

  const setImagePreview = (imageUrl: string) => {
    if (imageRef.current) {
      imageRef.current.src = imageUrl;
    }
  };

  const addToCartHandler = () => {
    addItemToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0]?.url,
      stock: product.stock,
      seller: product.seller,
      quantity: 1,
      publisher: product.publisher,
      category: product.category,
      author: product.author,
      description: product.description,
    });
  };
  const buyNowHandler = () => {
    addToCartHandler();
    router.push("/cart");
  };
  const breadCrumbList = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: `${product?.name?.substring(0, 100)}...`,
      url: `/products/${product?._id}`,
    },
  ];

  return (
    <>
      <BreadCrumbs breadCrumbList={breadCrumbList} />
      <section className="bg-white py-10">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-5">
            <aside>
              <div className="border border-gray-200 shadow-sm p-3 text-center rounded mb-5 relative">
                <Image
                  className="object-cover inline-block"
                  ref={imageRef}
                  src={
                    product?.images[0]
                      ? product?.images[0]?.url
                      : "/images/default_product.png"
                  }
                  alt={product?.name}
                  width="340"
                  height="340"
                />
                {onSale === "true" && (
                  <span className="absolute top-0 left-0 m-2 rounded-full bg-red-600 px-2 text-sm font-medium text-white">
                    40% OFF
                  </span>
                )}
              </div>

              <div className="space-x-2 overflow-auto text-center whitespace-nowrap">
                {product?.images?.map((img) => (
                  <a
                    key={img.url}
                    className="inline-block border border-gray-200 p-1 rounded-md hover:border-blue-500 cursor-pointer"
                    onClick={() => setImagePreview(img?.url)}
                  >
                    <Image
                      className="w-14 h-14"
                      src={img.url}
                      alt={product?.name}
                      width="500"
                      height="500"
                    />
                  </a>
                ))}
              </div>
            </aside>
            <main>
              <h2 className="font-semibold text-2xl mb-4">{product?.name}</h2>

              <div className="flex flex-wrap items-center space-x-2 mb-2">
                <div className="ratings">
                  <StarRatings
                    rating={product?.ratings}
                    starRatedColor="#ffb829"
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="2px"
                    name="rating"
                  />
                </div>
                <span className="text-yellow-500">{product?.ratings}</span>

                <svg
                  width="6px"
                  height="6px"
                  viewBox="0 0 6 6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="3" cy="3" r="3" fill="#DBDBDB" />
                </svg>

                <span className="text-green-500">Verified</span>
              </div>

              <p className="mb-4">
                {" "}
                {onSale === "true" ? (
                  <>
                    <span className="text-3xl font-bold text-slate-900">
                      ${(product?.price * 0.6).toFixed()}
                    </span>

                    <span className="text-sm text-slate-900 line-through">
                      ${(product?.price).toFixed()}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-slate-900">
                    ${product?.price}
                  </span>
                )}
              </p>

              <p className="mb-4 text-gray-500">{product?.description}</p>

              <div className="flex flex-wrap gap-5 mb-5">
                <button
                  onClick={addToCartHandler}
                  disabled={!inStock}
                  className="hover:scale-110 w-36 px-4 py-2 flex justify-center items-center gap-2 text-white text-base font-medium bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 transform transition-transform shadow-md"
                >
                  <FaShoppingBag />
                  Add to cart
                </button>
                <button
                  onClick={buyNowHandler}
                  disabled={!inStock}
                  className="hover:scale-110 w-36 px-4 py-2 flex justify-center items-center gap-2 text-white text-base font-medium bg-red-600 border border-transparent rounded-md hover:bg-red-700 transform transition-transform shadow-md"
                >
                  <FaShoppingCart />
                  Buy now
                </button>
              </div>

              <ul className="mb-5">
                <li className="mb-1">
                  <b className="font-medium w-36 inline-block">Stock</b>
                  {inStock ? (
                    <span className="text-green-500">In Stock</span>
                  ) : (
                    <span className="text-red-500">Out Of Stock</span>
                  )}
                </li>
                <li className="mb-1">
                  <b className="font-medium w-36 inline-block">Category:</b>
                  <span className="text-gray-500">{product?.category}</span>
                </li>
                <li className="mb-1">
                  <b className="font-medium w-36 inline-block">
                    Seller / Brand:
                  </b>
                  <span className="text-gray-500">{product?.seller}</span>
                </li>
              </ul>
            </main>
          </div>

          {canReview && <ReviewForm product={product} />}
          <hr />

          <div className="font-semibold">
            <h1 className="text-gray-500 review-title mb-6 mt-10 text-2xl ">
              Customers Reviews
            </h1>
            <Reviews
              reviews={product?.reviews}
              numberPerPage={numberPerPage}
              reviewsCount={reviewsCount}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
