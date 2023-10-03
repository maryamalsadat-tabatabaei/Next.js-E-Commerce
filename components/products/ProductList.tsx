"use client";
import ProductItem from "./ProductItem";
import Filters from "../layouts/Filters";
import Product from "@/interfaces/product";
import CustomPagination from "../layouts/Pagination";

interface Products {
  products: Product[];
  productsCount: number;
  numberPerPage: number;
  currentPage: number;
  totalPages: number;
  filteredProductsCount: number;
}
export default function ProductList({ data }: { data: Products }) {
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <>
      <section className="py-12">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row -mx-4">
            <Filters />
            <main className="md:w-2/3 lg:w-3/4 px-3">
              {data?.products?.length !== 0 ? (
                data?.products?.map((product, index) => (
                  <ProductItem key={index} product={product} />
                ))
              ) : (
                <main className="flex min-h-screen text-lg font-semibold flex-col items-center justify-between p-24">
                  No product found
                </main>
              )}
              {data?.filteredProductsCount > data?.numberPerPage && (
                <div className="mb-4">
                  <CustomPagination
                    numberPerPage={data?.numberPerPage}
                    productsCount={data?.filteredProductsCount}
                  />
                </div>
              )}
            </main>
          </div>
        </div>
      </section>
    </>
    // </main>
  );
}
