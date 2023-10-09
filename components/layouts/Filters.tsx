"use client";
import StarRatings from "react-star-ratings";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getPriceQueryParams } from "@/helpers/priceQuery";

const Filters = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const categories = [
    "Fiction",
    "Biography/Autobiography",
    "Science",
    "Fantasy",
    "Psychology",
    "Self-Help",
    "Mystery/Thriller",
    "Romance",
    "History",
  ];
  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  const clickHandler = (target: EventTarget) => {
    const checkbox = target as HTMLInputElement;

    if (typeof window !== "undefined") {
      const queryParams = new URLSearchParams(window.location.search);
      const checkboxes = document.getElementsByName(checkbox.name);

      checkboxes.forEach((item) => {
        if (item !== checkbox) (item as HTMLInputElement).checked = false;
      });

      if (!checkbox.checked) {
        queryParams.delete(checkbox.name);
      } else {
        if (queryParams.has(checkbox.name)) {
          queryParams.set(checkbox.name, checkbox.value);
        } else {
          queryParams.append(checkbox.name, checkbox.value);
        }
      }

      const path = window.location.pathname + "?" + queryParams.toString();
      router.push(path);
    }
  };

  const checkHandler = (
    checkBoxType: string,
    checkBoxValue: string
  ): boolean => {
    if (typeof window !== "undefined") {
      const queryParams = new URLSearchParams(window.location.search);

      const value = queryParams.get(checkBoxType);
      if (checkBoxValue === value) return true;
      return false;
    }

    return false;
  };
  const priceButtonClickHandler = () => {
    if (typeof window !== "undefined") {
      let queryParams = new URLSearchParams(window.location.search);

      queryParams = getPriceQueryParams(queryParams, "minPrice", minPrice);
      queryParams = getPriceQueryParams(queryParams, "maxPrice", maxPrice);

      const path = window.location.pathname + "?" + queryParams.toString();
      router.push(path);
    }
  };

  return (
    <aside
      className={`w-full md:w-1/3 lg:w-1/4 px-4 mb-4 md:mb-0 ${
        isOpen ? "md:block" : "md:hidden"
      }`}
    >
      <button
        onClick={toggleFilter}
        className="md:hidden mb-5 w-full text-center px-4 py-2 inline-block text-lg text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
      >
        {isOpen ? "Close Filters" : "Open Filters"}
      </button>
      {(isOpen || window.innerWidth >= 768) && (
        <>
          <div className="md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm">
            <h3 className="font-semibold mb-2">Price ($)</h3>
            <div className="grid md:grid-cols-3 gap-x-2">
              <div className="mb-4">
                <input
                  name="minPrice"
                  className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                  type="number"
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <input
                  name="maxPrice"
                  className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                  type="number"
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <button
                  onClick={priceButtonClickHandler}
                  className="px-1 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                >
                  Go
                </button>
              </div>
            </div>
          </div>
          <div className="md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm mt-4">
            <h3 className="font-semibold mb-2">Category</h3>

            <ul className="space-y-1">
              {categories.map((category, index) => (
                <li key={index}>
                  <label className="flex items-center">
                    <input
                      name="category"
                      type="checkbox"
                      value={category}
                      className="h-4 w-4"
                      defaultChecked={checkHandler("category", category)}
                      onClick={(e) => clickHandler(e.target)}
                    />
                    <span className="ml-2 text-gray-500"> {category}</span>
                  </label>
                </li>
              ))}
            </ul>

            <hr className="my-4" />

            <h3 className="font-semibold mb-2">Ratings</h3>
            <ul className="space-y-1">
              <li>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="flex items-center">
                    <input
                      name="ratings"
                      type="checkbox"
                      value={rating}
                      className="h-4 w-4"
                      defaultChecked={checkHandler("ratings", `${rating}`)}
                      onClick={(e) => clickHandler(e.target)}
                    />
                    <span className="ml-2 text-gray-500">
                      <StarRatings
                        rating={rating}
                        starRatedColor="#ffb829"
                        numberOfStars={rating}
                        starDimension="20px"
                        starSpacing="2px"
                        name="rating"
                      />
                    </span>
                  </label>
                ))}
              </li>
            </ul>
          </div>
        </>
      )}
    </aside>
  );
};

export default Filters;
