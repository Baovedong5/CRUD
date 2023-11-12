import axios from "@/utils/configAxios";

export const getAll = (query: string) => {
  return axios.get(`/answerer?${query}`);
};

export const getAllPagination = () => {
  return axios.get("/answerer");
};

export const createAnswer = (body: {
  name: string;
  gender: number;
  congrulation: string;
  answers: string;
}) => {
  return axios.post("/answerer", body);
};
