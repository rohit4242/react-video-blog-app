import React from "react";
import { Link } from "react-router-dom";

const Category = ({ data }) => {
  return (
    <div className="flex justify-center items-center">
      <img src={data.icon} width="30px" alt={data.name} />
      <Link
        to={`/category/${data.name}`}
        className="ml-3 min-w-0 hover:text-slate-400 text-gray-500 invisible sm:visible"
      >
        {data.name}
      </Link>
    </div>
  );
};

export default Category;
