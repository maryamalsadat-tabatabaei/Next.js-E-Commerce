"use client";
import Product from "@/interfaces/product";
import Link from "next/link";
import CustomPagination from "../layouts/Pagination";
import { FaPencilAlt, FaTrash, FaImage } from "react-icons/fa";
import { Fragment, useContext, useEffect } from "react";
import { ProductContext } from "@/context/ProductContext";
import { Types } from "mongoose";
import { toast } from "react-toastify";
interface Products {
  products: Product[];
  productsCount: number;
  numberPerPage: number;
  currentPage: number;
  totalPages: number;
  filteredProductsCount: number;
}
const Products = ({ data }: { data: Products }) => {
  const { error, clearErrors, deleteProduct, deleted, setDeleted } =
    useContext(ProductContext);
  useEffect(() => {
    if (deleted) {
      toast.success("Product Deleted");
      setDeleted(false);
    }
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error, deleted, clearErrors, setDeleted]);

  const deleteHandler = (productId: Types.ObjectId) => {
    deleteProduct(productId);
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="text-3xl my-5 ml-4 font-bold">
        {data?.productsCount} Products
      </h1>
      <table className="w-full text-sm text-left">
        <thead className="text-l text-gray-700 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Stock
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.products?.map((product) => {
            return (
              <Fragment key={product._id.toString()}>
                <tr className="bg-white">
                  <Link
                    href={`/product/${product._id}`}
                    className="hover:text-blue-600"
                  >
                    <td className="px-6 py-2">{product?.name}</td>
                  </Link>
                  <td className="px-6 py-2">{product?.stock}</td>
                  <td className="px-6 py-2">${product?.price}</td>
                  <td className="px-6 py-2">
                    <>
                      <Link
                        href={`/admin/products/${product._id}/upload-images`}
                        className="px-2 py-2 inline-block text-green-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                      >
                        <FaImage />
                      </Link>

                      <Link
                        href={`/admin/products/${product._id}`}
                        className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                      >
                        <FaPencilAlt />
                      </Link>
                      <a
                        onClick={() => deleteHandler(product._id)}
                        className="px-2 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                      >
                        <FaTrash />
                      </a>
                    </>
                  </td>
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </table>
      {data?.filteredProductsCount > data?.numberPerPage && (
        <div className="mb-4">
          <CustomPagination
            numberPerPage={data?.numberPerPage}
            productsCount={data?.filteredProductsCount}
          />
        </div>
      )}
    </div>
  );
};

export default Products;
