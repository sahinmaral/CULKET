import axios from "axios";

export const fetchAddDiscussion = (data) => {
  return axios.post(`https://localhost:7117/api/Discussions`, data);
};


export const fetchGetAllByCreatedUser = (token) => {
  return axios.get(`https://localhost:7117/api/Discussions/GetAllByCreatedUser?token=${token}`,);
};


export const fetchGetAllByDetail = (token) => {
  return axios.get(`https://localhost:7117/api/Discussions/GetAllByDetail`,);
};