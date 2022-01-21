import useSWR from "swr";
import { rssApi } from "../helpers/axios";

export function useCart() {
  const fetcher = (url) =>
    rssApi
      .get(url, {
        headers: {
          Authorization: localStorage.getItem("access_token"),
        },
      })
      .then((res) => res.data.data);
  const { data, error } = useSWR("cart", fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}
