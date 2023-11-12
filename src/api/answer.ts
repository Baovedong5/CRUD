import axios from "@/utils/configAxios";

export const getAll = () => {
  return axios.get("/answer");
};

export const getAnswerPagination = (query: string) => {
  return axios.get(`/answer?${query}`);
};

export const createAnswer = (body: {
  answer: string;
  question_id: string;
  answerer_id: string;
}) => {
  return axios.post("/answer", body);
};

export const updateAnswer = (
  id: string,
  body: {
    answer: string;
    question_id: string;
    answerer_id: string;
  }
) => {
  return axios.put(`/answer/${id}`, body);
};

export const deleteQuestion = (id: string) => {
  return axios.delete(`/answer/${id}`);
};
