import React from "react";
import MainDrawerProfilePhoto from "./MainDrawerProfilePhoto";
import MainDrawerMenu from "./MainDrawerMenu";
import { useAuth } from "../contexts/AuthContext";

function Drawer({ setIsDrawerOpened, isDrawerOpened }) {

  const {user} = useAuth()

  return (
    <div className={`drawer absolute${isDrawerOpened ? " z-10" : ""}`}>
      <input
        id="drawer-main"
        type="checkbox"
        className="drawer-toggle"
        onChange={() => setIsDrawerOpened(!isDrawerOpened)}
      />
      <div className="drawer-side">
        <label htmlFor="drawer-main" className="drawer-overlay"></label>
        <div className="w-80 bg-base-100 py-5 relative">
          <MainDrawerProfilePhoto
            src={
              "https://image.tmdb.org/t/p/w500/4J1Vu6oGzt60fakP4delEPDqEhI.jpg"
            }
          />

          <p className="pt-3 text-center">{user.username}</p>
          <MainDrawerMenu />
        </div>
      </div>
    </div>
  );
}

export default Drawer;
