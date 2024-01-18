import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

import {
  ApiModelDataTypes,
  ApiModelMapping,
  RequestOptions,
} from "./apiModelMapping";

type GetQueryParams<T extends keyof typeof ApiModelMapping> = {
  modelName: T;
  slug?: string;
  requestOptions?: RequestOptions;
  queryOptions?: Partial<
    UseQueryOptions<
      ApiModelDataTypes[T] | undefined,
      unknown,
      ApiModelDataTypes[T] | undefined,
      QueryKey
    >
  >;
  queryKey?: QueryKey;
};

export default function useGetItem<T extends keyof typeof ApiModelMapping>({
  modelName,
  slug,
  requestOptions = {},
  queryOptions = {},
  queryKey,
}: GetQueryParams<T>) {
  return useQuery({
    queryKey: queryKey ? queryKey : [modelName, slug],
    queryFn: async () => {
      if (slug) {
        const res = await ApiModelMapping[modelName].model.get<
          ApiModelDataTypes[T]
        >(slug, requestOptions);
        return res.data;
      }
    },
    enabled: !!slug,
    ...queryOptions,
  });
}
