import axios from "axios";

export const fetchGetAllFilms = (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return axios.get("https://localhost:7117/api/Films", config);
};

export const fetchGetFilmById = (token, id) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return axios.get(
    `https://localhost:7117/api/Films/GetByIdDetail?id=${id}`,
    config
  );
};

export const fetchGetRandomFiveFilmsByDetailExceptUserWatchedAndWantWatchFilms =
  (token) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    return axios.get(
      "https://localhost:7117/api/Films/GetRandomFiveFilmsByDetailExceptUserWatchedAndWantWatchFilms",
      config
    );
  };

export const fetchGetAllTitleOfFilms = (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return axios.get(
    "https://localhost:7117/api/Films/GetAllTitleOfFilms",
    config
  );
};

export const fetchGetAllTitleOfFilmsExceptUserWatchedAndWantWatchFilms = (
  token
) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return axios.get(
    "https://localhost:7117/api/Films/GetAllTitleOfFilmsExceptUserWatchedAndWantWatchFilms",
    config
  );
};
