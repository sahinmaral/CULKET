import React, { Fragment, useEffect, useState } from "react";
import FilmSuggestionCarouselItem from "./FilmSuggestionCarouselItem";
import { fetchGetRandomFiveFilmsByDetailExceptUserWatchedAndWantWatchFilms } from "../services/filmService";
import { useAuth } from "../contexts/AuthContext";

function FilmSuggestionCarousel() {
  const [randomFilms, setRandomFilms] = useState([]);
  const [setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cookies } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    fetchGetRandomFiveFilmsByDetailExceptUserWatchedAndWantWatchFilms(
      cookies["access-token"]
    )
      .then((result) => {
        if (result.status !== 200) {
          setErrors(result.errors);
        }
        setRandomFilms(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setErrors, cookies]);

  return (
    <Fragment>
      {!loading && (
        <Fragment>
          <h1 className="text-center">Önerilen fimler</h1>
          <div className="carousel w-full h-full rounded-md">
            {randomFilms.map((film, index) => {
              return (
                <div
                  id={`suggestedFilm_${film.id}`}
                  className="carousel-item w-full"
                  key={film.id}
                >
                  <FilmSuggestionCarouselItem
                    film={film}
                    films={randomFilms}
                    index={index}
                    setCurrentIndex={setCurrentIndex}
                    currentIndex={currentIndex}
                  />
                </div>
              );
            })}
          </div>
        </Fragment>
      )}
      {loading && <p>Loading ....</p>}
    </Fragment>
  );
}

export default FilmSuggestionCarousel;
