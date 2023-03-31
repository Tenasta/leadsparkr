import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.API_URL || "/"}`,
});

export const fetcher = (url: string) =>
  api.get(url).then((res) => res.data?.data);

export default api;