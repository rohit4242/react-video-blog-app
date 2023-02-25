import React, { useState } from "react";
import { Link } from "react-router-dom";
import { categories } from "../data";
import Category from "./Category";
import apps from "../Assets/svg/apps.svg";
import house_user from "../Assets/svg/house-user.svg";
import video from "../Assets/svg/video.svg";
import create_dashboard from "../Assets/svg/create-dashboard.svg";
import store from "../Assets/svg/store.svg";
import plus from "../Assets/svg/plus.svg";
import minus from "../Assets/svg/minus.svg";

const SideBar = ({ user }) => {
  const [open, setOpen] = useState(false);
  console.log(user?.photoURL);
  return (
    <>
      <div className="flex flex-col justify-between flex-1 mt-2">
        <nav>
          <Link
            className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md dark:bg-gray-800 dark:text-gray-200"
            to="/"
          >
            <img src={house_user} width="25px" alt="apps" />

            <span className="mx-4 font-medium invisible sm:visible">
              Dashboard
            </span>
          </Link>

          <Link
            className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            to="/category/:categoryId"
          >
            <img src={video} width="25px" alt="apps" />

            <span className="mx-4 font-medium invisible sm:visible">Feed</span>
          </Link>

          <Link
            className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            to="/create"
          >
            <img src={create_dashboard} width="25px" alt="apps" />

            <span className="mx-4 font-medium invisible sm:visible">
              Create
            </span>
          </Link>

          <Link
            className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            to="/videoDetail/:videoId"
          >
            <img src={store} width="25px" alt="apps" />

            <span className="mx-4 font-medium invisible sm:visible">
              Pin Video
            </span>
          </Link>

          <hr className="my-6 border-gray-200 dark:border-gray-600" />

          <div className="px-4 py-2">
            <h3 className="-mx-2 -my-3 flow-root">
              {/* <!-- Expand/collapse section button --> */}
              <button
                type="button"
                className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                onClick={() => setOpen(!open)}
              >
            <img src={apps} width="25px" alt="apps" />
                <span className="font-medium text-gray-900 invisible sm:visible">Category</span>
                <span className="ml-6 flex items-center invisible sm:visible">
                  {open && open ? (
                    <img src={minus} width="25px" alt="apps" />

                  ) : (
                    <img src={plus} width="25px" alt="apps" />

                  )}
                </span>
              </button>
            </h3>
            {/* <!-- Filter section, show/hide based on section state. --> */}
            {open && (
              <div className="pt-6" id="filter-section-mobile-1">
                <div className="space-y-6">
                  <div className="grid justify-center gap-2">
                    {categories &&
                      categories.map((data) => (
                        <Category key={data.id} data={data} />
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <hr className="my-6 border-gray-200 dark:border-gray-600" />

          {/* 
          <Link
            className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            to="/search"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <span className="mx-4 font-medium invisible sm:visible">
              Search
            </span>
          </Link> */}
        </nav>
      </div>
    </>
  );
};

export default SideBar;
