import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


function ErrorPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const {user} = useAuth()

  const [message, setMessage] = useState(
    "Aradığınız sayfa bulunamadı. Eğer 5 saniye içerisinde yönlendirilmezseniz aşağıdaki butona tıklayın."
  );
  const [statusCode, setStatusCode] = useState(404);

  const statusCodeAsString = useMemo(() => {
    return statusCode.toString();
  }, [statusCode]);

  useEffect(() => {
    if (location.state) {
      setMessage(location.state.message);
      setStatusCode(location.state.statusCode);
    }


    setTimeout(() => {
      if (user) {
        navigate("/");
      }else{
        navigate("/auth/login");
      }
    }, 5000);
  }, [location.state, navigate,user]);

  return (
    <div className="bg-red-400 pb-10 text-center text-white rounded-xl shadow-lg w-[350px] sm:w-[400px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="mt-[75px] sm:mt-[100px]">
        <span className="text-9xl font-bold px-5 text-black">
          {statusCodeAsString[0]}
        </span>
        <span className="text-9xl font-bold px-5">{statusCodeAsString[1]}</span>
        <span className="text-9xl font-bold px-5 text-black">
          {statusCodeAsString[2]}
        </span>
      </div>
      <div className="text-xl mt-[50px] px-[50px] text-gray-200 opacity-70">
        <span>{message}</span>
      </div>
      <button
        className="btn btn-success mt-5 text-white w-[80%]"
        onClick={() => {
          navigate("/auth/login");
        }}
      >
        Tıklayın
      </button>
    </div>
  );
}

export default ErrorPage;
