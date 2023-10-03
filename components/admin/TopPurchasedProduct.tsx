"use client";
import Product from "@/interfaces/product";
import { useContext, useEffect } from "react";
import { ProductContext } from "@/context/ProductContext";
import { toast } from "react-toastify";
import TopProductItem from "./TopProductItem";
import CustomPagination from "../layouts/Pagination";

interface ProductsProps {
  topProducts: Product[];
  productsCount: number;
  numberPerPage: number;
}
const TopPurchasedProducts = ({ data }: { data: ProductsProps }) => {
  const { error, clearErrors } = useContext(ProductContext);
  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error, clearErrors]);

  return (
    <section className="container max-w-screen-xl mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-2">
        {data?.topProducts?.length !== 0 ? (
          data?.topProducts?.map((product) => (
            // <ProductItem key={index} product={product} />

            <TopProductItem product={product} key={product._id.toString()} />
          ))
        ) : (
          <main className="flex min-h-screen text-lg font-semibold flex-col items-center justify-between p-24">
            No product found
          </main>
        )}
      </div>
      {data?.productsCount > data?.numberPerPage && (
        <div className="mb-4">
          <CustomPagination
            numberPerPage={data?.numberPerPage}
            productsCount={data?.productsCount}
          />
        </div>
      )}
    </section>
  );
};

export default TopPurchasedProducts;
