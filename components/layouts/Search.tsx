"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  const submitHandler = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (!keyword) {
      router.push("/");
    } else {
      router.push(`/products?keyword=${keyword}`);
    }
  };
  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col md:flex-row items-center w-full order-last md:order-none mt-5 md:mt-0 md:w-2/4 lg:w-2/4"
    >
      <input
        className="flex-grow appearance-none border border-gray-200 bg-gray-100 rounded-md mr-2 mb-2 md:mb-0 py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400"
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Enter your keyword"
        required
      />
      <button
        onClick={submitHandler}
        type="button"
        className="px-4 py-2 inline-block border border-transparent bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
};

export default Search;
