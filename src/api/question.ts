import axios from "../utils/configAxios";

export const getAll = (query: string) => {
  return axios.get(`/question?${query}`);
};

export const all = () => {
  return axios.get("/question");
};

export const createQuestion = (body: {
  title: string;
  suggest_answer: string;
  description: string;
  required: string;
  type_id: string;
}) => {
  return axios.post("/question", body);
};

export const updateQuestion = (
  id: string,
  body: {
    title: string;
    suggest_answer: string;
    description: string;
    required: boolean;
    type_id: string;
  }
) => {
  return axios.put(`/question/${id}`, body);
};

export const deleteQuestion = (id: string) => {
  return axios.delete(`/question/${id}`);
};
