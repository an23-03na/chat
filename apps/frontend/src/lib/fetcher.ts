import { axiosInstance } from "./instance";

export const fetcher = async (url: string) =>
  (await axiosInstance.get(url)).data;
