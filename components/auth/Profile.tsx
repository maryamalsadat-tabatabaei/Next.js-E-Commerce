import Link from "next/link";
import UserProfileInfo from "./UserProfileInfo";
import { FaPlus } from "react-icons/fa";
import Address from "@/interfaces/address";
import AddressList from "../user/AddressList";

const Profile = ({ userAddressList }: { userAddressList: Address[] }) => {
  return (
    <>
      <UserProfileInfo />
      <hr className="my-4" />
      {userAddressList &&
        userAddressList?.map((address) => {
          return (
            <AddressList address={address} key={address?._id?.toString()} />
          );
        })}
      <Link
        href="/address/new"
        className="px-4 py-2  items-center inline-flex text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100"
      >
        <FaPlus className="mr-1" />
        Add new address
      </Link>
    </>
  );
};

export default Profile;
