import axios from "../utils/configAxios";

export const createQT = (body: {
  name: string;
  title: string;
  description: string;
}) => {
  return axios.post("/type", body);
};

export const getAll = (query: string) => {
  return axios.get(`/type?${query}`);
};

export const all = () => {
  return axios.get("/type");
};
