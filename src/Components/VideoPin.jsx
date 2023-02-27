import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserInfo } from "../Utils/fetchData";
import { fdb } from "../firebase";
import moment from "moment/moment";
const avatar =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2Xg7OqPCNHxVv8ZU5k0YzeO80MjAd2IbPyw&usqp=CAU";
const VideoPin = ({ data }) => {
  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (data) setUserId(data.userID);
    if (userId)
      getUserInfo(fdb, userId).then((data) => {
        setUserInfo(data);
      });
    console.log(data);
  }, [userId, data]);

  return (
    // <div className="overflow-hidden transition-shadow duration-300 bg-white rounded-md shadow-xl">
    <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
      <Link to={`/videoDetail/${data?.id}`}>
        <video
          src={data.videoURL}
          className="h-56 w-full object-cover hover:scale-105 duration-500"
          onMouseOver={(e) => e.target.play()}
          onMouseOut={(e) => e.target.pause()}
        />
      </Link>
      <div className="bg-white p-4 sm:p-6">
        <time datetime="2022-10-10" className="block text-xs text-gray-500">
          {moment(new Date(parseInt(data.id)).toISOString()).fromNow()}
        </time>
        <div className="flex mt-4 justify-between">
          <div className="flex items-center ">
            <Link to={`/userDetail/${userId}`} className="mr-3 ">
              <img
                src={userInfo?.photoURL ? userInfo?.photoURL : avatar}
                alt="avatar"
                className="object-cover w-10 h-10 rounded-full shadow-sm ring ring-primary hover:ring-teal-300 ring-offset-base-100 ring-offset-2"
              />
            </Link>

            <div>
              <p
                title="User"
                className="font-semibold text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
                {userInfo?.displayName}
              </p>
              <p className="text-sm font-medium leading-4 text-gray-600">
                User
              </p>
            </div>
          </div>
          <h3 className="mt-0.5 text-lg text-gray-900"  title="Category">{data.category}</h3>
        </div>
      </div>
    </article>

    // </div>
  );
};

export default VideoPin;
