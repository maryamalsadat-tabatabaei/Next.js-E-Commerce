"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "@headlessui/react";
import Search from "@/components/layouts/Search";
import { CartContext } from "@/context/CartContext";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import User from "@/interfaces/user";
import { signOut } from "next-auth/react";
import {
  FaBars,
  FaShoppingCart,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const { cart } = useContext(CartContext);
  const { user, setUser } = useContext(AuthContext);
  const { data } = useSession();
  console.log("dataaaaaa", data);

  useEffect(() => {
    if (data) {
      setUser(data?.user as User | null);
    }
  }, [data, setUser]);

  const logoutHandler = () => {
    signOut();
  };
  return (
    <header className="bg-white py-2 border-b">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-wrap items-center">
          <div className="flex-shrink-0 mr-5">
            <Link href="/">
              <Image
                src={"/images/logo.png" || "BookConnect"}
                height="40"
                width="120"
                alt="BuyItNow"
              />
            </Link>
          </div>
          <Search />

          <div className="flex items-center space-x-2 ml-auto">
            <Link
              href="/products"
              className="transform transition-transform flex items-center px-3 py-2 text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
            >
              Products
            </Link>
            <Link
              href="/cart"
              className="transform transition-transform flex items-center px-3 py-2 text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
            >
              <FaShoppingCart className="text-blue-600 w-5" />
              <span className="hidden lg:inline ml-1">
                Cart (<b>{cart?.cartItems?.length || 0}</b>)
              </span>
            </Link>
            {!user ? (
              <Link
                href="/login"
                className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
              >
                <i className="text-gray-400 w-5 fa fa-user"></i>
                <span className="hidden lg:inline ml-1">Sign in</span>
              </Link>
            ) : (
              <Menu as="div" className="relative">
                <Menu.Button
                  as="button"
                  className="flex whitespace-nowrap rounded bg-primary px-4 leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  type="button"
                  id="dropdownMenu"
                  aria-expanded="false"
                  onClick={toggleDropdown}
                >
                  <div className="flex items-center my-1 space-x-3 cursor-pointer">
                    <Image
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full"
                      src={
                        user?.avatar
                          ? (user?.avatar?.url as string)
                          : "/images/default.png"
                      }
                      alt="User avatar"
                    />
                    <div className="space-y-1 font-medium">
                      <div className="text-left">
                        {user?.name || "User"}
                        <time className="block text-sm text-gray-500 dark:text-gray-400">
                          {user?.email}
                        </time>
                      </div>
                    </div>
                  </div>
                  <span className="ml-2 w-2 mt-4 ">
                    {showDropdown ? (
                      <FaChevronUp size={16} color="currentColor" />
                    ) : (
                      <FaChevronDown size={16} color="currentColor" />
                    )}
                  </span>
                </Menu.Button>

                <Menu.Items
                  as="ul"
                  className="absolute z-[1000] w-full float-left my-2 text-center text-sm font-semibold min-w-max list-none overflow-hidden rounded-lg border-none bg-gray-100 bg-clip-padding shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                  aria-labelledby="dropdownMenu"
                >
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/profile"
                        className={`block w-full whitespace-nowrap px-16 py-2 text-neutral-700 hover:bg-grey-500 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600 ${
                          active && "bg-grey-500"
                        }`}
                        data-te-dropdown-item-ref
                      >
                        Dashboard
                      </Link>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={logoutHandler}
                        href="/login"
                        className={`block w-full whitespace-nowrap px-16 py-2 text-neutral-700 hover:bg-grey-500 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600 ${
                          active && "bg-grey-500"
                        }`}
                        data-te-dropdown-item-ref
                      >
                        <i className="text-gray-400 w-5 fa fa-user"></i>
                        <span className="hidden lg:inline ml-1">Logout</span>
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            )}
          </div>

          <div className="lg:hidden ml-2">
            <button
              type="button"
              className="bg-white p-3 inline-flex items-center rounded-md text-black hover:bg-gray-200 hover:text-gray-800 border border-transparent"
            >
              <span className="sr-only">Open menu</span>
              <FaBars className="fa-lg" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
