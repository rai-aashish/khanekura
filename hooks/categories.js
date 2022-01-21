import useSWR from "swr"
import { rssApi } from "../helpers/axios"

export function useCategories(){
    const fetcher = url => rssApi.get(url).then(res => res.data.data)
    const { data, error } = useSWR('category', fetcher)

    return {
      categories: data,
      isLoading: !error && !data,
      isError: error
    }
}