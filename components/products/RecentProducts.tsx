"use client";
import { Navigation, Pagination, A11y, Keyboard, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Product from "@/interfaces/product";
import { useContext, useEffect } from "react";
import { ProductContext } from "@/context/ProductContext";
import { toast } from "react-toastify";
import { useRef } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductSlide from "./ProductSlide";

// External Data import
// const url = "https://fakestoreapi.com/products";

const RecentProducts = ({ recentProducts }: { recentProducts: Product[] }) => {
  const { error, clearErrors } = useContext(ProductContext);
  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error, clearErrors]);
  const swiperRef = useRef(null);

  return (
    <div className="my-4 border-t-2 p-4">
      <h1 className="text-center text-6xl font-bold text-blue-800 ">
        Recent Products
      </h1>
      <br />
      <Swiper
        ref={swiperRef}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Keyboard, Navigation, Pagination, A11y]}
        slidesPerView={1}
        spaceBetween={5}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        centeredSlides={true}
        breakpoints={{
          480: { slidesPerView: 1 },
          750: { slidesPerView: 2 },
          1275: { slidesPerView: 3 },
        }}
        className="mySwiper"
      >
        {recentProducts?.length !== 0 ? (
          recentProducts?.map((product) => (
            <SwiperSlide
              key={product._id.toString()}
              className="!flex justify-center items-center"
            >
              <ProductSlide product={product} key={product._id.toString()} />
            </SwiperSlide>
          ))
        ) : (
          <main className="flex min-h-screen text-lg font-semibold flex-col items-center justify-between p-24">
            No product found
          </main>
        )}
      </Swiper>
    </div>
  );
};

export default RecentProducts;
