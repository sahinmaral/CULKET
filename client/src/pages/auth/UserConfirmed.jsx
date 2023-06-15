import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchConfirmAccount } from "../../services/authService";
import { useQuery } from "../../hooks/useQuery";
import { Link } from "react-router-dom";
import { convertAsStringOfExceptionMessages } from "../../helpers/exceptionHelper";

function UserConfirmed() {
  const navigate = useNavigate();
  const query = useQuery();

  useEffect(() => {
    if (!query.get("email") || !query.get("token")) {
      navigate("/auth/login");
    }

    fetchConfirmAccount(query.get("email"), query.get("token"))
      .then(() => {
        setTimeout(() => {
          navigate(`/auth/fillDetailedInformationsAfterRegister?email=${query.get("email")}`, {
            state: { email: query.get("email") },
          });
        }, 7000);
      })
      .catch((error) => {
        const errorMessage = convertAsStringOfExceptionMessages(error);
        navigate(`/${error.response.status}`, {
          state: { statusCode: error.response.status, message: errorMessage },
        });
      });
  }, [navigate, query]);

  return (
    <div>
      <section className="bg-gray-50 h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="w-[50px] h-[50px] rounded-full bg-green-600">
                <FontAwesomeIcon
                  icon={faCheck}
                  size="2xl"
                  className="text-white mt-[0.3em] ml-[0.35em]"
                />
              </div>
              <p className="text-base leading-tight tracking-tight text-black md:text-2xl ">
                Hesabınız onaylanmıştır. Detaylı olan bilgilerinizi girmeniz
                için sayfaya yönlendirileceksiniz. Eğer 7 saniye içerisinde
                yönlendirilmezseniz{" "}
                <Link to="/auth/fillDetailedInformationsAfterRegister">
                  <span className="font-medium text-green-700 hover:underline">
                    buraya{" "}
                  </span>
                </Link>
                tıklayınız.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UserConfirmed;
