import {
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";

import {
  ApiModelDataTypes,
  ApiModelMapping,
  RequestOptions,
} from "./apiModelMapping";

type ListQueryParams<T extends keyof typeof ApiModelMapping> = {
  modelName: T;
  queryKey?: QueryKey;
  requestOptions?: RequestOptions;
  queryOptions?: Omit<UseInfiniteQueryOptions, "queryKey" | "queryFn">;
};

export default function useListInfiniteItems<
  T extends keyof typeof ApiModelMapping
>({
  modelName,
  requestOptions = {},
  queryOptions = {},
  queryKey,
}: ListQueryParams<T>) {
  return useInfiniteQuery<ApiResponse<ApiModelDataTypes[T][]>>(
    queryKey || [modelName],
    async ({ pageParam }) => {
      const options = {
        ...requestOptions,
        query: { offset: pageParam, limit: 25, ...requestOptions.query },
      };
      const res = await ApiModelMapping[modelName].model.list<
        ApiModelDataTypes[typeof modelName]
      >(options);
      return { data: res.data };
    },
    {
      getNextPageParam: (lastPage, pages) => pages.length * 25,
    }
  );
}
