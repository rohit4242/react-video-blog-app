import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserInfo } from "../Utils/fetchData";
import { fdb } from "../firebase";

const VideoPin = ({ data }) => {
  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (data) setUserId(data.userID);
    if (userId)
      getUserInfo(fdb, userId).then((data) => {
        setUserInfo(data);
      });
  }, [userId]);
  return (
    <div className="overflow-hidden transition-shadow duration-300 bg-white rounded-md shadow-xl">
      <Link to={""}>
        <video
          src={data.videoURL}
          className="object-cover w-full h-64"
          muted
          onMouseOver={(e) => e.target.play()}
          onMouseOut={(e) => e.target.pause()}
        />
      </Link>

      <div className="p-4 border border-t-0 ">
        <p className="mb-2 text-xs font-semibold tracking-wide uppercase flex justify-between items-center">
          <a
            href="/"
            className="transition-colors duration-200 text-blue-gray-900 hover:text-deep-purple-accent-700"
            aria-label="Category"
            title="traveling"
          >
            {data.category}
          </a>

          <span className="text-gray-600">
            {" "}
            <div className="relative -top-10">
              <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={userInfo?.photoURL}
                  alt="user"
                  className="rounded-full"
                />
              </div>
            </div>
            28 Dec 2020
          </span>
        </p>
      </div>
    </div>
  );
};

export default VideoPin;
