"use client";
import ProductItem from "./ProductItem";
import Filters from "../layouts/Filters";
import Product from "@/lib/interfaces/product";

interface Products {
  products: Product[];
}
export default function ProductList({ data }: { data: Products }) {
  console.log("data", data);
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <section className="py-12">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col md:flex-row -mx-4">
          <Filters />
          <main className="md:w-2/3 lg:w-3/4 px-3">
            {data?.products?.map((product) => (
              <ProductItem key={product?._id} product={product} />
            ))}
          </main>
        </div>
      </div>
    </section>
    // </main>
  );
}
