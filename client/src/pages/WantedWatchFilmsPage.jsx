import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  fetchGetWantWatchFilmsOfUserFromAccessToken,
  fetchUpdateWantWatchFilmOfUser,
} from "../services/authService";
import { faCheck, faComment } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function WantedWatchFilmsPage() {
  const { cookies } = useAuth();
  const [wantedWatchFilms, setWantedWatchFilms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGetWantWatchFilmsOfUserFromAccessToken(cookies["access-token"])
      .then((result) => {
        setWantedWatchFilms(result.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [cookies]);

  const updateWantWatchFilm = (id) => {
    fetchUpdateWantWatchFilmOfUser(cookies["access-token"], id)
      .then(() => {
        toast.success(
          "Filmi izlediğiniz için tebrikler. Yakın zamanda değerlendirmenizi bekliyoruz",
          {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );

        setTimeout(() => {
          navigate("/watchedFilms");
        }, 5000);
      })
      .catch((error) => {
        const errorMessage = error.response.data.errors.join("\n");

        toast.error(errorMessage, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-green-900 md:text-2xl">
        İzlemek istediğim filmler
      </h1>
      <ul className="menu gap-y-2 w-full">
        {wantedWatchFilms.map((wantWatchFilm) => {
          return (
            <Link to={`/films/${wantWatchFilm.id}`} key={wantWatchFilm.id}>
              <li className="shadow flex flex-row justify-between pl-4 hover:bg-slate-100 border border-slate-200">
                <p className="hover:bg-slate-100">{wantWatchFilm.title}</p>

                <div className="description hover:bg-slate-100">
                  <p>{wantWatchFilm.userAddedDate}</p>
                  <div
                    className="tooltip tooltip-left"
                    data-tip={`${wantWatchFilm.title} filmini izlediyseniz tıklayınız`}
                  >
                    <button
                      className="btn border-0 bg-green-700 text-white hover:text-black hover:bg-green-400"
                      onClick={() => {
                        updateWantWatchFilm(wantWatchFilm.id);
                      }}
                    >
                      <FontAwesomeIcon icon={faCheck} size="xl" />
                    </button>
                  </div>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default WantedWatchFilmsPage;
