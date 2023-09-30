"use client";
import Link from "next/link";
import Image from "next/image";
import Search from "@/components/layouts/Search";
import { CartContext } from "@/context/CartContext";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import User from "@/interfaces/user";
import { FaShoppingCart } from "react-icons/fa";

const Header = () => {
  const { cart } = useContext(CartContext);
  const { user, setUser } = useContext(AuthContext);
  const { data } = useSession();

  useEffect(() => {
    if (data) {
      setUser(data?.user as User | null);
    }
  }, [data]);

  return (
    <header className="bg-white py-2 border-b">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-wrap items-center">
          <div className="flex-shrink-0 mr-5">
            <a href="/">
              <Image
                src={"/images/logo.png" || "BookConnect"}
                height="40"
                width="120"
                alt="BuyItNow"
              />
            </a>
          </div>
          <Search />

          <div className="flex items-center space-x-2 ml-auto">
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
              // <Link
              //   onClick={() => signOut()}
              //   href="/login"
              //   className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
              // >
              //   <i className="text-gray-400 w-5 fa fa-user"></i>
              //   <span className="hidden lg:inline ml-1">Logout</span>
              // </Link>
              <Link href="/profile">
                <div className="flex items-center mb-4 space-x-3 mt-4 cursor-pointer">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={
                      user?.avatar ? user?.avatar?.url : "/images/default.png"
                    }
                  />
                  <div className="space-y-1 font-medium">
                    <div>
                      {user?.name || "User"}
                      <time className="block text-sm text-gray-500 dark:text-gray-400">
                        {user?.email}
                      </time>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>

          <div className="lg:hidden ml-2">
            <button
              type="button"
              className="bg-white p-3 inline-flex items-center rounded-md text-black hover:bg-gray-200 hover:text-gray-800 border border-transparent"
            >
              <span className="sr-only">Open menu</span>
              <i className="fa fa-bars fa-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
