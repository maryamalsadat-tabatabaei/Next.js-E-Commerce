"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { formatDate } from "@/helpers/formatDate";
import Image from "next/image";

const UserProfileInfo = () => {
  const { user } = useContext(AuthContext);

  return (
    <figure className="flex items-start sm:items-center">
      <div className="relative">
        <Image
          width={64}
          height={64}
          className="w-16 h-16 rounded-full mr-4"
          src={
            user?.avatar ? (user?.avatar?.url as string) : "/images/default.png"
          }
          alt={user?.name as string}
        />
      </div>
      <figcaption>
        <h5 className="font-semibold text-lg">{user?.name}</h5>
        <div>
          <b>Email:</b> {user?.email}| <b>Joined On:</b>
          {formatDate(user?.createdAt as string | undefined)}
        </div>
      </figcaption>
    </figure>
  );
};

export default UserProfileInfo;
