import { useEffect } from "react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { fetchGetAllTitleOfFilms } from "../services/filmService";
import { useAuth } from "../contexts/AuthContext";
import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { fetchAddWatchedFilmsAfterRegister } from "../services/authService";

function AddWatchedFilmsAfterRegister() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [films, setFilms] = useState([]);
  const [watchedFilms, setWatchedFilms] = useState([]);
  const { cookies } = useAuth();

  const filteredFilmTitles = useMemo(() => {
    return Object.keys(films).filter((filmId) => {
      return (
        films[filmId].toLocaleLowerCase().includes(name.toLocaleLowerCase()) &&
        watchedFilms.filter(
          (watchedFilm) => watchedFilm.title === films[filmId]
        ).length === 0
      );
    });
  }, [name]);

  const addFilmToList = (film) => {
    setWatchedFilms([...watchedFilms, film]);
    setName("");
  };

  const removeFilmFromList = (id) => {
    setWatchedFilms(
      watchedFilms.filter((watchedFilm) => watchedFilm.id !== id)
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetchAddWatchedFilmsAfterRegister({
      accessToken: cookies["access-token"],
      filmIds: watchedFilms.map((film) => film.id),
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

  const fillAutoComplete = (name) => {
    setName(name);
  };

  useEffect(() => {
    fetchGetAllTitleOfFilms(cookies["access-token"])
      .then((result) => {
        setFilms(result.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [cookies]);

  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl mb-2 font-bold leading-tight tracking-tight text-green-900 md:text-2xl">
        Önceden izlediğiniz filmleri ekleyin
      </h1>
      <span className="font-bold text-gray-300 md:text-xl">
        * Bu alan sadece bir defa açıldığı için lütfen dikkatli bir şekilde
        seçiniz
      </span>
      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          className="input input-bordered w-full rounded-none focus:outline-none"
          onChange={(e) => fillAutoComplete(e.target.value)}
          placeholder="Film adını giriniz"
          tabIndex={0}
        />
        <div
          className={`dropdown dropdown-open ${
            name.length === 0 ? "hidden" : "block"
          }`}
        >
          <ul
            tabIndex={0}
            className="dropdown-content shadow bg-base-100 rounded-none w-full -mt-[1.50rem]"
          >
            {/*
            TODO: Film gelen liste icerisinde yoksa istek gönder
            */}

            {/* {filteredFilmTitles.length === 0 && name.length !== 0 && (
              <li className="py-2 pl-4 hover:bg-slate-100 hover:cursor-pointer">
                <span>
                  Yazdığınız film listede bulunmamaktadır. Eklenmesini
                  istiyorsanız tıklayınız.
                </span>
              </li>
            )} */}

            {/*
            TODO: Film gelen liste icerisinde yoksa da eklemenmesini isteyebilir
            */}
            {filteredFilmTitles.map((filmId) => {
              return (
                <li
                  onClick={() => {
                    addFilmToList({ id: filmId, title: films[filmId] });
                  }}
                  key={filmId}
                  className="py-2 pl-4 hover:bg-slate-100 hover:cursor-pointer"
                >
                  {films[filmId]}
                </li>
              );
            })}
          </ul>
        </div>

        <ul className="menu gap-y-2 w-full">
          {watchedFilms.map((watchedFilm) => {
            return (
              <li
                key={watchedFilm.id}
                className="shadow flex flex-row justify-between pl-4 hover:bg-slate-100 border border-slate-200"
              >
                <p className="hover:bg-slate-100">{watchedFilm.title}</p>
                <button
                  className="btn rounded-none border-0 bg-red-700 text-white hover:text-black hover:bg-red-400"
                  onClick={() => {
                    removeFilmFromList(watchedFilm.id);
                  }}
                >
                  <FontAwesomeIcon icon={faClose} size="xl" />
                </button>
              </li>
            );
          })}
        </ul>

        <button
          type="submit"
          className="w-full text-white bg-blue-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          Kaydet
        </button>
      </form>
    </div>
  );
}

export default AddWatchedFilmsAfterRegister;
