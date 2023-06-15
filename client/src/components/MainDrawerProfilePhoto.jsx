import React from "react";

function MainDrawerProfilePhoto({ src }) {
  return (
    <div className="avatar w-full flex justify-center">
      <div className="w-32 rounded">
        <img src={src} alt="user-profile"/>
      </div>
    </div>
  );
}

export default MainDrawerProfilePhoto;
