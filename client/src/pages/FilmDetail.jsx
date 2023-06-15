import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchGetFilmById } from "../services/filmService";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { toast } from "react-toastify";
import { fetchAddWantWatchFilmsOfUser } from "../services/authService";

function FilmDetail() {
  const { filmId } = useParams();
  const { cookies } = useAuth();
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    fetchGetFilmById(cookies["access-token"], filmId)
      .then((result) => {
        setFilm(result.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const addWantWatchFilmOfUser = (film) => {
    fetchAddWantWatchFilmsOfUser({
      accessToken: cookies["access-token"],
      filmIds: [film.id],
    })
      .then(() => {
        toast.success(`İzlediğiniz film listesi güncellenmiştir`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setTimeout(() => {
          navigate(0);
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
    }

  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <div className="h-[600px] bg-slate-400 bg-opacity-50 shadow-xl p-5">
        <div className="flex justify-between mb-5">
          <div className="text-white">
            <h1 className="text-2xl font-semibold text-white">{film.title}</h1>
            <span>{film.releaseDate.slice(0, 4)}</span>
            {film.isAgeRestricted && <span> &#183; {"R"}</span>}
            <span> &#183; {film.language.toLocaleUpperCase()}</span>
          </div>
        </div>
        <div className="flex">
          <img
            className="mr-3"
            src={`https://image.tmdb.org/t/p/w300/${film.posterImageURL}`}
          />
          <div className="flex flex-col">
            <div className="-ml-1 flex md:flex-row flex-col gap-3">
              {film.genres.map((genre) => {
                return (
                  <div
                    key={genre.id}
                    className="border-0 badge badge-lg badge-ghost hover:bg-slate-200 hover:cursor-pointer mx-1"
                  >
                    {genre.name}
                  </div>
                );
              })}
            </div>
            <span className="mt-3">{film.description}</span>
              <button onClick={() => addWantWatchFilmOfUser(film)}
                type="submit"
                className="mt-5 w-full text-white bg-blue-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 "
              >
                İzleneceklere ekle
              </button>
            {/* <button
              type="submit"
              className="mt-5 w-full text-white bg-blue-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 "
            >
              Değerlendirmelere git
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilmDetail;
