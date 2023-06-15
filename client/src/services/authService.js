import axios from "axios";

export const fetchLogin = (username, password) => {
  return axios.post("https://localhost:7117/api/Users/Login", {
    username: username,
    password: password,
  });
};

export const fetchRegister = (username, email, password) => {
  return axios.post("https://localhost:7117/api/Users/Register", {
    username: username,
    email: email,
    password: password,
  });
};

export const fetchLogout = () => {
  return axios.post("https://localhost:7117/api/Users/Logout");
};

export const fetchConfirmAccount = (email, token) => {
  return axios.get(
    `https://localhost:7117/api/Users/ConfirmAccount?email=${email}&token=${token}`
  );
};

export const fetchSendEmailConfirmLink = (email) => {
  return axios.post(
    `https://localhost:7117/api/Users/SendEmailConfirmationLink?email=${email}`
  );
};

export const fetchGetUserFromAccessToken = (token) => {
  return axios.get(
    `https://localhost:7117/api/Users/GetUserFromAccessToken?token=${token}`
  );
};

export const fetchFillDetailedInformationsAfterRegister = (data) => {
  return axios.post(
    `https://localhost:7117/api/Users/FillDetailedInformationsAfterRegister`,
    data
  );
};

export const fetchAddWatchedFilmsAfterRegister = (data) => {
  return axios.post(
    `https://localhost:7117/api/Users/AddWatchedFilmsAfterRegister`,
    data
  );
};

export const fetchAddWantWatchFilmsOfUser = (data) => {
  return axios.post(
    `https://localhost:7117/api/Users/AddWantWatchFilmsOfUser`,
    data
  );
};

export const fetchGetWatchedFilmsOfUserFromAccessToken = (token) => {
  return axios.get(
    `https://localhost:7117/api/Users/GetWatchedFilmsOfUserFromAccessToken?token=${token}`
  );
};

export const fetchGetWantWatchFilmsOfUserFromAccessToken = (token) => {
  return axios.get(
    `https://localhost:7117/api/Users/GetWantWatchFilmsOfUserFromAccessToken?token=${token}`
  );
};


//TODO : Form-body ile gondermek mumkun mu ?
export const fetchUpdateWantWatchFilmOfUser = (
  accessToken,
  updatedWantWatchFilmId
) => {
  return axios.get(
    `https://localhost:7117/api/Users/UpdateWantWatchFilmOfUser?updatedWantWatchFilmId=${updatedWantWatchFilmId}&token=${accessToken}`
  );
};
