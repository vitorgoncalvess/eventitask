import { useState } from "react";
import axiosInstance from "../(axios)/config";

type Method = "get" | "post" | "delete" | "patch" | "put";

const useAxios = (method: Method, url: string, body?: any) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetch = () => {
    setIsLoading(true);
    axiosInstance[method](url, body)
      .then((response) => {
        setData(response.data);
        setError(null);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { data, error, isLoading, fetch };
};

export default useAxios;
