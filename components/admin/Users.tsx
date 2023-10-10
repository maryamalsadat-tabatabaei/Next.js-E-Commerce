"use client";
import Link from "next/link";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import CustomPagination from "../layouts/Pagination";
import { Types } from "mongoose";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "@/context/AuthContext";
import User from "@/interfaces/user";
import Modal from "../layouts/Modal";
interface UsersType {
  users: User[];
  numberPerPage: number;
  usersCount: number;
}
const Users = ({ users }: { users: UsersType }) => {
  const { error, clearErrors, deleteUser, deleted, setDeleted } =
    useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (deleted) {
      toast.success("User Deleted");
      setDeleted(false);
    }
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error, deleted, clearErrors, setDeleted]);

  const openModalHanlder = () => setShowModal(true);
  const closeModalHanlder = () => setShowModal(false);

  const deleteHandler = (userId: Types.ObjectId) => {
    // alert("Modal Confirmed");
    deleteUser(userId);
    setShowModal(false);
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="text-3xl my-5 ml-4 font-bold">
        {users?.usersCount} Users
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left whitespace-no-wrap">
          <thead className="text-l text-gray-700 uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.users?.map((user) => (
              <tr className="bg-white" key={user?._id?.toString()}>
                <td className="px-6 py-2">{user?.name}</td>
                <td className="px-6 py-2">{user?.email}</td>
                <td className="px-6 py-2">{user?.role}</td>
                <td className="px-6 py-2">
                  <div className="flex">
                    <Link
                      href={`/admin/users/${user?._id}`}
                      className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm buser buser-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                    >
                      <FaPencilAlt />
                    </Link>
                    <a
                      onClick={openModalHanlder}
                      className="px-2 py-2 inline-block text-red-600 bg-white shadow-sm buser buser-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                    >
                      <FaTrash />
                    </a>
                    <Modal
                      isOpen={showModal}
                      onDismiss={closeModalHanlder}
                      title="Delete Confirmation"
                    >
                      <div className="mt-4 flex flex-col justify-center items-center ">
                        <h1 className="p-2 text-lg font-semibold">
                          Are you sure to delete?
                        </h1>
                        <hr className="text-gray-300  w-full mt-8 mb-2" />
                        <div className="flex justify-center items-center gap-10">
                          <button
                            className="px-4 py-2 bg-green-900 text-white rounded-lg"
                            type="submit"
                            onClick={() =>
                              deleteHandler(user?._id as Types.ObjectId)
                            }
                          >
                            Confirm
                          </button>
                          <button
                            className="px-4 py-2 bg-red-900 text-white rounded-lg"
                            onClick={closeModalHanlder}
                          >
                            Dismiss
                          </button>
                        </div>
                      </div>
                    </Modal>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {users?.usersCount > users?.numberPerPage && (
        <div className="mb-4">
          <CustomPagination
            numberPerPage={users?.numberPerPage}
            productsCount={users?.usersCount}
          />
        </div>
      )}
    </div>
  );
};

export default Users;
