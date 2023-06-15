import React, { useEffect, useMemo } from "react";
import {
  fetchGetAllFilms,
} from "../services/filmService";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

function SearchFilmInput() {
  const { cookies } = useAuth();
  const [name, setName] = useState("");
  const [films, setFilms] = useState([]);

  const filteredFilmTitles = useMemo(() => {
    return films
      .filter((film) => {
        return film.title
          .toLocaleLowerCase()
          .includes(name.toLocaleLowerCase());
      })
      .slice(0, 8);
  }, [name]);

  const fillAutoComplete = (name) => {
    setName(name);
  };

  useEffect(() => {
    fetchGetAllFilms(cookies["access-token"])
      .then((result) => {
        setFilms(result.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [cookies]);

  return (
    <div className="hidden md:block">
      <input
        type="search"
        onChange={(e) => {
          fillAutoComplete(e.target.value);
        }}
        id="default-search"
        className="block w-[400px] px-4 py-2 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
        placeholder="Başlığa göre film araştır"
      />

      <div
        className={`dropdown dropdown-open ${
          name.length === 0 ? "hidden" : "block"
        }`}
      >
        <ul
          tabIndex={0}
          className="dropdown-content shadow bg-base-100 rounded-none w-[400px]"
        >
          {filteredFilmTitles.map((film) => {
            return (
              // TODO:Ayni sayfada iken sayfa degismiyor
              <Link to={`/films/${film.id}`} key={film.id}>
                <li
                  className="py-2 px-4 hover:bg-slate-100 hover:cursor-pointer flex"
                >
                  <img
                    className="h-[70px]"
                    src={`https://image.tmdb.org/t/p/original/${film.posterImageURL}`}
                  />
                  <div className="ml-2">
                    <p className="font-bold">{film.title}</p>
                    <p>{film.releaseDate.slice(0, 4)}</p>
                  </div>
                </li>
              </Link>
            );
          })}
          <li className="py-2 px-4 hover:bg-slate-100 hover:cursor-pointer flex">
            <Link to="/" className="font-bold">
              "{name}" filmi için bütün sonuçları göster
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SearchFilmInput;
