"use client";

import { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
// import UserAddresses from "../user/UserAddresses";
// import Sidebar from "../layout/Sidebar";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <section className="py-10">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row -mx-4">
            {/* <Sidebar /> */}
            <main className="md:w-2/3 lg:w-3/4 px-4">
              <figure className="flex items-start sm:items-center">
                <div className="relative">
                  <img
                    className="w-16 h-16 rounded-full mr-4"
                    src={
                      user?.avatar ? user?.avatar?.url : "/images/default.png"
                    }
                    alt={user?.name}
                  />
                </div>
                <figcaption>
                  <h5 className="font-semibold text-lg">{user?.name}</h5>
                  <p>
                    <b>Email:</b> {user?.email}| <b>Joined On:</b>
                    {user?.createdAt?.getDate()}
                  </p>
                </figcaption>
              </figure>

              <hr className="my-4" />

              {/* <UserAddresses /> */}

              <Link href="/address/new">
                <button className="px-4 py-2 inline-block text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100">
                  <i className="mr-1 fa fa-plus"></i> Add new address
                </button>
              </Link>

              <hr className="my-4" />
            </main>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
