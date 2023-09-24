"use client";

import Link from "next/link";
import BreadCrumbs from "../layouts/BreadCrumbs";
import Address from "@/interfaces/address";
import { useState } from "react";
import { toast } from "react-toastify";
import ShippingSummery from "./ShippingSummery";

const Shipping = ({ userAddressList }: { userAddressList: Address[] }) => {
  const [shippingInfo, setShippingInfo] = useState<string | undefined>("");

  const setShippingAddress = (address: Address) => {
    setShippingInfo(address._id?.toString());
  };
  const CheckoutHandler = () => {
    if (!shippingInfo) {
      return toast.error("Please select your shipping address");
    }
    // move to stripe checkoutpage
  };
  const breadCrumbList = [
    { name: "Home", url: "/" },
    { name: "Cart", url: "/cart" },
    { name: "Order", url: "" },
  ];
  return (
    <div>
      <BreadCrumbs breadCrumbList={breadCrumbList} />
      <section className="py-10 bg-gray-50">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 lg:gap-8">
            <main className="md:w-2/3">
              <article className="border border-gray-200 bg-white shadow-sm rounded p-4 lg:p-6 mb-5">
                <h2 className="text-xl font-semibold mb-5">
                  Shipping information
                </h2>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  {userAddressList &&
                    userAddressList?.map((address) => {
                      return (
                        <label
                          onClick={() => setShippingAddress(address)}
                          className="flex p-3 border border-gray-200 rounded-md bg-gray-50 hover:border-blue-400 hover:bg-blue-50 cursor-pointer"
                        >
                          <span>
                            <input
                              name="shipping"
                              type="radio"
                              className="h-4 w-4 mt-1"
                            />
                          </span>
                          <p className="ml-2">
                            <span>{address.street} street</span>
                            <small className="block text-sm text-gray-400">
                              {address.city}, {address.state}, {address.zipCode}
                              <br />
                              {address.country}
                              <br />
                              {address.phoneNo}
                            </small>
                          </p>
                        </label>
                      );
                    })}
                </div>

                <Link
                  href="/address/new"
                  className="px-4 py-2 inline-block text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100"
                >
                  <i className="mr-1 fa fa-plus"></i> Add new address
                </Link>

                <div className="flex justify-end space-x-2 mt-10">
                  <Link
                    href="/cart"
                    className="px-5 py-2 inline-block text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
                  >
                    Back
                  </Link>
                  <a
                    onClick={CheckoutHandler}
                    className="px-5 py-2 inline-block text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 cursor-pointer"
                  >
                    Checkout
                  </a>
                </div>
              </article>
            </main>
            <ShippingSummery />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shipping;
