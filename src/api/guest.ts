import axios from "@/utils/configAxios";

export const getVender = (query: string, headers: Record<string, string>) => {
  return axios.get(`/guest?${query}`, { headers });
};
