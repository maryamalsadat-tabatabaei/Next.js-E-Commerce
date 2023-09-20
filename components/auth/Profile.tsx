import Link from "next/link";
// import UserAddresses from "../user/UserAddresses";
import UserProfileInfo from "./UserProfileInfo";
import { FaPlus } from "react-icons/fa";

const Profile = () => {
  return (
    <>
      <UserProfileInfo />
      <hr className="my-4" />

      {/* <UserAddresses /> */}

      <Link
        href="/address/new"
        className="px-4 py-2  items-center inline-flex text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100"
      >
        <FaPlus className="mr-1" />
        Add new address
      </Link>
      <hr className="my-4" />
    </>
  );
};

export default Profile;
