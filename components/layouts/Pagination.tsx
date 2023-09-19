"use client";
import { useSearchParams, useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { useEffect } from "react";
import Pagination from "react-js-pagination";

const CustomPagination = ({
  numberPerPage,
  productsCount,
}: {
  numberPerPage: number;
  productsCount: number;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  let page = searchParams?.get("page") || 1;
  page = Number(page);

  let queryParams;

  const handlePageChange = (currentPage: string) => {
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);

      if (queryParams.has("page")) {
        queryParams.set("page", currentPage);
      } else {
        queryParams.append("page", currentPage);
      }

      const path = window.location.pathname + "?" + queryParams.toString();
      router.push(path);
    }
  };
  // const handlePageChange = (currentPage: number) => {
  //   if (typeof window !== "undefined") {
  //     router.push({
  //       pathname: router.pathname,
  //       query: { ...router.query, page: currentPage.toString() },
  //     });
  //   }
  // };
  // useEffect(() => {
  //   const { page, ...filterParams } = router.query;

  //   if (filterParams && router.query.page !== "1") {
  //     router.push({
  //       pathname: router.pathname,
  //       query: { ...router.query, page: "1" },
  //     });
  //   }
  // }, [router.query]);

  return (
    <div className="flex mt-20 justify-center">
      <Pagination
        activePage={page}
        itemsCountPerPage={numberPerPage}
        totalItemsCount={productsCount}
        onChange={handlePageChange}
        pageRangeDisplayed={3}
        nextPageText={"Next >"}
        prevPageText={"< Prev"}
        itemClass="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
        activeLinkClassName="z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 text-sm font-medium text-indigo-600 focus:z-20"
        activeClass="z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 text-sm font-medium text-indigo-600 focus:z-20"
      />
    </div>
  );
};

export default CustomPagination;
