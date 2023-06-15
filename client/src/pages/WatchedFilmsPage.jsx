import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchGetWatchedFilmsOfUserFromAccessToken } from "../services/authService";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function WatchedFilmsPage() {
  const { cookies } = useAuth();
  const [watchedFilms, setWatchedFilms] = useState([]);

  useEffect(() => {
    fetchGetWatchedFilmsOfUserFromAccessToken(cookies["access-token"])
      .then((result) => {
        setWatchedFilms(result.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [cookies]);

  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-green-900 md:text-2xl">
        İzlediğiniz filmler
      </h1>
      <ul className="menu gap-y-2 w-full">
        {watchedFilms.map((watchedFilm) => {
          return (
            <Link to={`/addReview/${watchedFilm.id}`} key={watchedFilm.id}>
            <li
              key={watchedFilm.id}
              className="shadow flex flex-row justify-between pl-4 hover:bg-slate-100 border border-slate-200"
            >
              <p className="hover:bg-slate-100">{watchedFilm.title}</p>

              <div className="description hover:bg-slate-100">
                <p>{watchedFilm.userAddedDate}</p>
                <div
                  className="tooltip tooltip-left"
                  data-tip={`${watchedFilm.title} hakkında değerlendirme yapmak için tıklayınız`}
                >
                  <button className="btn border-0 bg-green-700 text-white hover:text-black hover:bg-green-400">
                    <FontAwesomeIcon icon={faComment} size="xl" />
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

export default WatchedFilmsPage;
