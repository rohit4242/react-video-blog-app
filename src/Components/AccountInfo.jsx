import React from "react";

const AccountInfo = ({ user }) => {
  return (
    <div className="flex-col justify-center items-center">
      <h3>Current User is: {user?.displayName}</h3>
      <p>Your email is: {user?.email}</p>
    </div>
  );
};

export default AccountInfo;
