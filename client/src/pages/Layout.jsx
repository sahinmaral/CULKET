import React, { useState } from "react";
import MainDrawer from "../components/MainDrawer";
import Navbar from "../components/Navbar";

import { useAuth } from "../contexts/AuthContext";
import UserHasToAddWatchedFilmsAlert from "../components/UserHasToAddWatchedFilmsAlert";

function Layout({ children }) {
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const { user } = useAuth();

  return (
    <div className="relative">
      <Navbar />
      <MainDrawer
        setIsDrawerOpened={setIsDrawerOpened}
        isDrawerOpened={isDrawerOpened}
      />

      {!user.isUserAddedWatchedFilmsAfterRegister && (
        <UserHasToAddWatchedFilmsAlert />
      )}

      <div className="container mx-auto mt-[50px] relative">{children}</div>
    </div>
  );
}

export default Layout;
