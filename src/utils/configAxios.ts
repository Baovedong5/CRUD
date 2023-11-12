import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4003/api/v1",
});

export default instance;
