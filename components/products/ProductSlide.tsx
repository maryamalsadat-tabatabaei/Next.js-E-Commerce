"use client";
import { CartContext } from "@/context/CartContext";
import Product from "@/interfaces/product";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import StarRatings from "react-star-ratings";

const ProductSlide = ({
  product,
  onSale = false,
}: {
  product: Product;
  onSale?: boolean;
}) => {
  const { addItemToCart } = useContext(CartContext);
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
  return (
    <div className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      {/* <a
        className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
        href="#"
          > */}
      <div className="hover:text-blue-600 relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
        <Image
          className="object-contain w-full"
          src={
            product?.images[0]
              ? product?.images[0].url
              : "/images/default_product.png"
          }
          alt={product.name}
          height="240"
          width="240"
        />
        {onSale && (
          <span className="absolute top-0 left-0 m-2 rounded-full bg-orange-700 px-2 text-center text-sm font-medium text-white">
            40% OFF
          </span>
        )}
      </div>
      <div className="mt-4 px-5 pb-5">
        <Link href={`/product/${product._id}?onSale=${onSale}`}>
          <h5 className="text-base font-semibold tracking-tight text-slate-900">
            {product?.name}
          </h5>
        </Link>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            {onSale ? (
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
          <div className="flex items-center">
            <div className="ratings text-base font-medium">
              <div className="my-1">
                <StarRatings
                  rating={product?.ratings}
                  starRatedColor="#ffb829"
                  numberOfStars={5}
                  starDimension="18px"
                  starSpacing="1px"
                  name="rating"
                />{" "}
                {product?.ratings}
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={addToCartHandler}
          className={`flex items-center w-full justify-center rounded-md ${
            onSale ? "bg-orange-700" : "bg-blue-700"
          }  py-2.5 text-center text-sm font-medium text-white ${
            onSale ? "hover:bg-orange-800 " : "hover:bg-blue-800"
          } focus:outline-none focus:ring-4 focus:ring-blue-300`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductSlide;
