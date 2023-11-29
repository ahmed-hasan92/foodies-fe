import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect, useRef } from "react";
import { getMyProfile } from "../api/auth";
import { getAllCategories } from "../api/category";
import RecipeCreate from "../components/RecipeCreate";
import MyRecipeList from "../components/MyRecipeList";
import { Quote } from "lucide-react";

const MyProfile = () => {
  const [show, setShow] = useState(false);
  const onClose = () => setShow(false);
  const onOpen = () => setShow(true);
  const [query, setQuery] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["myProfile"],
    queryFn: () => getMyProfile(),
  });
  // console.log(data);
  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  const handleSearch = (e) => {
    setQuery(e.target.value); // Update the search query state
  };

  const profileImageUrl = data?.image
    ? `http://localhost:8000/${data.image}`
    : "https://cdn1.vectorstock.com/i/1000x1000/97/60/chef-hat-flat-icon-with-red-background-vector-21409760.jpg";

  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="bg-[#333333] w-full min-h-screen py-[100px] px-[150px]">
      <div className="flex flex-row gap-[30px]">
        <div className="bg-white py-[30px] w-[50%] flex flex-row justify-between px-11 items-center rounded-b-3xl drop-shadow-[0_30px_30px_rgba(0,0,0,0.60)]">
          <div className="flex flex-col justify-center items-start">
            <div className="text-[#333333] font-bold flex gap-[5px]">
              Name:
              <span className="font-normal">
                {isLoading ? "loading..." : data?.name}
              </span>
            </div>
            <div className="text-[#333333] font-bold flex gap-[5px]">
              Username:
              <span className="font-normal">
                {isLoading ? "loading..." : data?.username}
              </span>
            </div>
            <div className="text-[#333333] font-bold flex gap-[5px]">
              No. of Recipes:
              <span className="font-normal">
                {isLoading ? "loading..." : data?.recipes.length}
              </span>
            </div>
          </div>
          <div className="h-[100px] w-[100px] border border-solid-[2px] border-white rounded-full overflow-hidden ">
            <img className="object-cover" src={profileImageUrl} alt="Profile" />
          </div>
        </div>
        <div className="bg-black bg-opacity-30 py-[30px] px-[30px] gap-[20px] w-full flex flex-col justify-center items-center rounded-b-3xl drop-shadow-[0_30px_30px_rgba(0,0,0,0.60)]">
          <div className="flex flex-row gap-2">
            <div className="text-white transform scale-x-[-1]">
              <Quote />
            </div>
            <div className="text-white text-center text-2xl font-bold">
              A recipe has no soul. You, as the cook, must bring soul to the
              recipe
            </div>
            <div className="text-white">
              <Quote />
            </div>
          </div>
          <div className="text-white text-lg font-bold">Thomas Keller</div>
        </div>
      </div>
      {isLoadingCategories ? (
        <div>Loading categories...</div>
      ) : (
        <form className="pt-[30px]">
          <div className="flex">
            <div className="relative" ref={dropdownRef}>
              <button
                id="dropdown-button"
                onClick={toggleDropdown}
                className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                type="button"
              >
                Filter
                {/* <svg
                  className="w-2.5 h-2.5 ml-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg> */}
              </button>
              {isDropdownOpen && (
                <div
                  id="dropdown"
                  className="absolute z-10 mt-1 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdown-button"
                  >
                    {categories?.map((category, index) => (
                      <li key={index}>
                        <button
                          type="button"
                          className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          {category.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="relative w-full">
              <input
                type="text"
                id="search-dropdown"
                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-[#910808] focus:border-[#910808] dark:bg-gray-700 dark:border-l-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-[#910808]"
                placeholder="Search by recipe name ..."
                onChange={handleSearch}
              />
              <button
                type="submit"
                className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-[#910808] rounded-r-lg border border-[#910808] hover:bg-[#B73232] focus:ring-4 focus:outline-none focus:ring-[#910808] dark:bg-[#910808] dark:hover:bg-[#B73232] dark:focus:ring-white"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
        </form>
      )}
      <div className="flex flex-row w-full items-center py-[40px] gap-[20px]">
        <button
          onClick={onOpen}
          className="px-[20px]  gap-[10px] flex flex-row items-center bg-[#910808] text-white rounded-md hover:bg-[#b73232] transition-colors"
        >
          <span className="font-bold text-[30px]">+</span>Create Recipe
        </button>
        <h1 className="text-white text-[24px] font-bold items-center">
          MY RECIPES
        </h1>
      </div>
      <RecipeCreate show={show} onClose={onClose} onSave={() => {}} />
      <div class="w-full h-full">
        <MyRecipeList query={query} />
      </div>
    </div>
  );
};

export default MyProfile;
