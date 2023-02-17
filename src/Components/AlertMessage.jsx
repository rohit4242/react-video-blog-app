import React from "react";

const AlertMessage = ({ icon, message }) => {
  return (
    <div
      class="bg-green-100 rounded-lg py-5 px-6 mb-3 text-base text-green-700 inline-flex items-center w-full"
      role='alert'
    >
      <img src={icon} width="25px" alt="apps" />
      <div className="pl-4">{message}</div>
    </div>
  );
};

export default AlertMessage;
