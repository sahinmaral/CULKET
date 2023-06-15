import axios from "axios";

export const fetchAddComment = (data) => {
  return axios.post(`https://localhost:7117/api/Comments`, data);
};