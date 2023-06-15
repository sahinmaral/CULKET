import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRouteAsNewlyRegistered({children}) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }
  else if(!user.isUserAddedWatchedFilmsAfterRegister){
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRouteAsNewlyRegistered;
