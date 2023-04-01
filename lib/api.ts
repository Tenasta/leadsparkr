import axios, { AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL || "/api"}`,
});

export const fetcher = (url: string, config?: AxiosRequestConfig<any>) =>
  api.get(url, config).then((res) => res.data?.data);

export default api;
