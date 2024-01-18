import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

import {
  ApiModelDataTypes,
  ApiModelMapping,
  RequestOptions,
} from "./apiModelMapping";

type ListQueryParams<T extends keyof typeof ApiModelMapping> = {
  modelName: T;
  queryKey?: QueryKey;
  requestOptions?: RequestOptions;
  queryOptions?: Partial<
    UseQueryOptions<
      ApiModelDataTypes[T][],
      unknown,
      ApiModelDataTypes[T][],
      QueryKey
    >
  >;
};

export default function useListItems<T extends keyof typeof ApiModelMapping>({
  modelName,
  requestOptions = {},
  queryOptions = {},
  queryKey,
}: ListQueryParams<T>) {
  return useQuery(
    queryKey || ([modelName] as QueryKey),
    async () => {
      const res = await ApiModelMapping[modelName].model.list<
        ApiModelDataTypes[typeof modelName]
      >(requestOptions);
      return res.data;
    },
    queryOptions
  );
}
