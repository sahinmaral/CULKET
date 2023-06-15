import React, { Fragment } from "react";
import FilmSuggestionCarouselNextPrevButtons from "./FilmSuggestionCarouselNextPrevButtons";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";
import { fetchAddWantWatchFilmsOfUser } from "../services/authService";

function FilmSuggestionCarouselItem({
  film,
  films,
  index,
  currentIndex,
  setCurrentIndex,
}) {
  const navigate = useNavigate();
  const { cookies } = useAuth();

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

        //TODO: Ayni sayfada refresh atma olmuyor
        setTimeout(() => {
          navigate("/");
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
    <Fragment>
      <div className="card pt-5 bg-base-100 shadow-xl w-full rounded-none">
        <figure>
          <img
            src={`https://image.tmdb.org/t/p/w500/${film.backdropImageURL}`}
            alt="Album"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{film.title}</h2>
          <p>{film.description}</p>
          <div className="card-actions justify-end">
            <Link className="btn btn-secondary" to={`/films/${film.id}`}>
              Detaylara Git
            </Link>
            <button
              className="btn btn-primary"
              onClick={() => {
                addWantWatchFilmOfUser(film);
              }}
            >
              İzlenecekler listesine ekle
            </button>
          </div>
        </div>
      </div>
      <FilmSuggestionCarouselNextPrevButtons
        films={films}
        index={index}
        setCurrentIndex={setCurrentIndex}
        currentIndex={currentIndex}
      />
    </Fragment>
  );
}

export default FilmSuggestionCarouselItem;
