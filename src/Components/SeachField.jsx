import React from "react";
import search from "../Assets/svg/search.svg";

const SearchField = () => {
  return (
    <form className="xl:w-[500px] sm:w-80 md:w-96">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <img src={search} width="20px" alt="apps" />

        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
          placeholder="Search"
          required
        />
        <button
          type="submit"
          className="text-white absolute right-2 bottom-2.5 bg-teal-500 hover:bg-teal-400 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-teal-500 dark:hover:bg-teal-400 dark:focus:ring-teal-300 "
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchField;
