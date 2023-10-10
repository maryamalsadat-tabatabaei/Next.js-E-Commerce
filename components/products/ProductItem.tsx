"use client";
import Image from "next/image";
import Link from "next/link";
import Product from "@/interfaces/product";
import StarRatings from "react-star-ratings";
import { CartContext } from "@/context/CartContext";
import { useContext } from "react";

const ProductItem = ({
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
    <article className="border border-gray-200 overflow-hidden bg-white shadow-sm rounded mb-5">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/4 flex justify-center p-3">
          <div className="w-4/5 lg:w-full h-48 lg:h-auto relative">
            <Image
              src={
                product?.images[0]
                  ? product?.images[0].url
                  : "/images/default_product.png"
              }
              alt={product.name}
              layout="fill"
              objectFit="contain"
            />
            {onSale && (
              <span className="absolute top-0 left-0 m-2 rounded-full bg-orange-700 px-2 text-center text-sm font-medium text-white">
                40% OFF
              </span>
            )}
          </div>
        </div>
        <div className="lg:w-2/4">
          <div className="p-4">
            <Link
              href={`/product/${product._id}?onSale=${onSale}`}
              className="hover:text-blue-600"
            >
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            </Link>
            <div className="flex items-center space-x-2 mb-2">
              <div className="ratings">
                <div className="my-1">
                  <StarRatings
                    rating={product?.ratings}
                    starRatedColor="#ffb829"
                    numberOfStars={5}
                    starDimension="18px"
                    starSpacing="1px"
                    name="rating"
                  />
                  <span className="text-gray-500">Star Ratings</span>
                </div>
              </div>
              <b className="text-gray-300">•</b>
              <span className="ml-1 text-yellow-500">{product?.ratings}</span>
            </div>
            <p className="text-gray-500 mb-2">
              {product?.description.substring(0, 150)}...
            </p>
          </div>
        </div>
        <div className="lg:w-1/4 border-t lg:border-t-0 lg:border-l border-gray-200">
          <div className="p-5 text-center">
            {/* <span className="text-xl font-semibold text-black">
              ${product.price}
            </span> */}
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
            <p className="text-green-500">Free Shipping</p>
            <div className="my-3">
              <button
                onClick={addToCartHandler}
                className="px-4 py-2 text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 cursor-pointer"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductItem;
