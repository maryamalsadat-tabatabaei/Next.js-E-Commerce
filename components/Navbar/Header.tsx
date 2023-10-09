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
  FaUser,
} from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const toggleDropdown = () => setShowDropdown((prev) => !prev);
  const toggleMenu = () => setShowMenu(!showMenu);

  const { cart } = useContext(CartContext);
  const { user, setUser } = useContext(AuthContext);
  const { data } = useSession();

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
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex-shrink-0 mr-5">
            <Link href="/">
              <Image
                src="/images/logo.png"
                height="40"
                width="120"
                alt="BuyItNow"
              />
            </Link>
          </div>
          <div className="hidden lg:flex-grow lg:flex lg:items-center lg:w-auto">
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
                          className={`block w-full whitespace-nowrap px-16 py-2 text-neutral-700 hover:bg-grey-500 hover:text-white active:bg-primary-600 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600 ${
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
                          className={`block w-full whitespace-nowrap px-16 py-2 text-neutral-700 hover:bg-grey-500 hover:text-white active:bg-primary-600 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600 ${
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
          </div>

          <div className="lg:hidden ml-2">
            <button
              type="button"
              className="bg-white p-3 inline-flex items-center rounded-md text-black hover:bg-gray-200 hover:text-gray-800 border border-transparent"
              onClick={toggleMenu}
            >
              <FaBars className="fa-lg text-blue-600" size={25} />
            </button>
          </div>

          {showMenu && (
            <div className="fixed top-0 left-0 w-full bg-white z-50 flex flex-col items-center">
              <div className="flex justify-between w-full p-2">
                <Link href="/">
                  <Image
                    src="/images/logo.png"
                    height="20"
                    width="60"
                    alt="BuyItNow"
                  />
                </Link>
                <button
                  type="button"
                  className="text-black"
                  onClick={toggleMenu}
                >
                  <AiOutlineClose />
                </button>
              </div>
              <hr className="w-full border-t border-gray-300" />
              <div className="flex sm:flex-row sm:justify-evenly items-center sm:gap-4 flex-col py-4">
                <Link
                  href="/products"
                  className="my-1 text-base font-medium text-center text-gray-700 hover:text-blue-600"
                >
                  Products
                </Link>
                <Link
                  href="/cart"
                  className="my-1 text-base font-medium text-center text-gray-700 hover:text-blue-600"
                >
                  Cart ({cart?.cartItems?.length || 0})
                </Link>
                {!user ? (
                  <Link
                    href="/login"
                    className="my-1 text-base font-medium text-center text-gray-700 hover:text-blue-600"
                  >
                    Sign in
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/profile"
                      className="my-1 text-base font-medium text-center text-gray-700 hover:text-blue-600"
                    >
                      Dashboard
                    </Link>
                    <Link
                      onClick={logoutHandler}
                      href="/login"
                      className="my-1 text-base font-medium text-center text-gray-700 hover:text-blue-600 flex items-center"
                    >
                      Logout
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
